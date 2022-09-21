import axios from 'axios'
import cookie from 'cookie'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        if (!req.headers.cookie) {
            res.status(403).json({ message: "Not Authorized" })
        }

        try {
            const { refresh } = cookie.parse(req.headers.cookie)

            const config = {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
            const body = {
                refresh
            }
            const { data } = await axios.post("http://localhost:8000/api/token/refresh/", body, config)

            if (data && data.access) {
                const userConfig = {
                    headers: {
                        "Authorization": "Bearer " + data.access
                    }
                }

                const { data: userData } = await axios.get("http://localhost:8000/user/", userConfig)
                return res.status(200).json({ user: userData, access: data.access })
            }
            return res.status(500).json({ message: "Something went wrong" })
        } catch (error) {
            if (error.response) {
                return res.status(401).json({message: error.response.data.detail})
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
              return res.status(500).json({message: "Something went wrong"})
        }

    }
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
}
