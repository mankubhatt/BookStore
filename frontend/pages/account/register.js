import Link from 'next/link'
import React, { useContext, useState } from 'react'
import Alert from '../../components/Alert'
import authContext from '../../context/authContext'
import styles from '../../styles/Login.module.css'


export default function register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  
  const { register, error } = useContext(authContext)

  const submitHandler = e => {
    e.preventDefault();
    register({username, email, password, password2})
  }

  return (
    <>
    <Alert alert={error}/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className={`card col-md-6 col-sm-12 ${styles.loginCard}`}>
          <h2 className='display-5 mt-3'>Create an account</h2>
          <hr />
          <form className='my-2' onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" onChange={e => setUsername(e.target.value)} value={username} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" onChange={e => setEmail(e.target.value)} value={email} aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} value={password} id="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="password2" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" onChange={e => setPassword2(e.target.value)} value={password2} id="password2" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <Link href='/account/login'>
            <a className='text-decoration-none my-3'>Already have an account? Sign In</a>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
