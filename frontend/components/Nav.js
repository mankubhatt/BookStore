import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import authContext from '../context/authContext'

export default function Nav() {
  const router = useRouter()
  const { user, logout } = useContext(authContext)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link href="/"><a className="navbar-brand">Library</a></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/"><a className="nav-link active" aria-current="page" >Home</a></Link>
            </li>
          </ul>
          {!user ? (
            <div className="d-flex">
              <button className="btn btn-primary mx-2" onClick={() => router.push('/account/login')}>Login</button>
              <button className="btn btn-primary mx-2" onClick={() => router.push('/account/register')}>Register</button>
            </div>
          ) : (
            <div>
              <button className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>
            </div>
            )}

        </div>
      </div>
    </nav>
  )
}
