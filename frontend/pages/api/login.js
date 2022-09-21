import axios from 'axios'
import cookie from 'cookie'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let accessToken = null
    const { username, password } = req.body
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
    const body = {
      username,
      password
    }

    try {
      const { data: accessResponse } = await axios.post("http://localhost:8000/api/token/", body, config)
      accessToken = accessResponse.access
      res.setHeader('Set-Cookie',cookie.serialize('refresh', accessResponse.refresh, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60,
        path: '/'
      }))
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return res.status(401).json({message: error.response.data.detail})
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      return res.status(500).json({message: "Something went wrong"})
    }

    if (accessToken){
      const userConfig = {
        headers : {
          "Authorization": "Bearer " + accessToken
        }
      }
      const {data:userData} = await axios.get("http://localhost:8000/user/", userConfig)
      console.log(userData)
      return res.status(200).json({user: userData, access: accessToken})
    }
  }
  res.setHeader('Allow', ['POST'])
  res.status(405).json({ message: `Method ${req.method} not allowed` })
}
