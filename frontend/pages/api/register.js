import axios from 'axios'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
    const body = {
      username,
      email,
      password
    }

    try {
      await axios.post("http://localhost:8000/user/register/", body, config)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if(error.response.data.detail){
            return res.status(401).json({message: error.response.data.detail})
        }
        if (error.response.data){
            const first_key = Object.keys(error.response.data)[0]
            res.status(401).json({message: first_key.charAt(0).toUpperCase() + first_key.slice(1) + ": " + error.response.data[first_key][0]})
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      return res.status(500).json({message: "Something went wrong"})
    }
    return res.status(200).json({message: "User has been created successfully"})
  }
  res.setHeader('Allow', ['POST'])
  res.status(405).json({ message: `Method ${req.method} not allowed` })
}
