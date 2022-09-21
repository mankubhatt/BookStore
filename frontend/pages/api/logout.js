import cookie from 'cookie'

export default function handler(req, res) {
    res.setHeader('Set-Cookie', cookie.serialize('refresh', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: new Date(0),
        path: '/'
    }))
    res.status(200).json({ message: "User has been logged out successfully" })
}
