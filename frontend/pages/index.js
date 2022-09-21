import Head from 'next/head'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import authContext from '../context/authContext'
import { useContext, useState } from 'react'
import AddNote from '../components/AddBook'
import { useRouter } from 'next/router'


export default function Home({ books }) {
  const router = useRouter()
  const { user } = useContext(authContext)

  return (
    <Layout>
      <div className="container mt-3">
        <h1 className='display-2 text-center'>Welcome to Library</h1>
        {user && <AddNote />}
        <h1 className='display-5 my-4'>Available Books Are</h1>

        <ol className="list-group list-group-numbered">
          {books.map(book => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={book.id}>
              {book.name}
              {user && <button type="button" class="btn btn-primary" onClick={()=> router.push(`books/${book.id}`)}>Update</button>}
            </li>
          ))}
        </ol>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get('http://localhost:8000/library/books')
  // Fetch our data
  return {
    props: {
      books: data
    }
  }
}