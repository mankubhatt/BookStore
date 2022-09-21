import Link from 'next/link'
import React, { useContext, useState } from 'react'
import Alert from '../../components/Alert'
import authContext from '../../context/authContext'
import styles from '../../styles/Login.module.css'

export default function login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, error } = useContext(authContext)

  const submitHandler = e => {
    e.preventDefault();
    login({username, password})
  }

  return (
    <>
    <Alert alert={error}/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className={`card col-md-6 col-sm-12 ${styles.loginCard}`}>
          <h2 className='display-5 mt-3'>Login</h2>
          <hr />
          <form className='my-2' onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Email address</label>
              <input type="text" className="form-control" id="username" onChange={e => setUsername(e.target.value)} value={username} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} value={password} id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <Link href='/account/register'>
            <a className='text-decoration-none my-3'>Don't have an account? Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
