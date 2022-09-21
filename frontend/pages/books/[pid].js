import { useRouter } from 'next/router'
import axios from 'axios'
import { useContext, useState } from 'react'
import authContext from '../../context/authContext'


const Book = ({ book }) => {
  const router = useRouter()
  const { accessToken } = useContext(authContext)
    const [name, setName] = useState(book.name)
    const onChange = (e) => {
        setName(e.target.value )
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const handleUpdateClick = async (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken,
                'X-CSRFToken': csrftoken,
            }
        }
        const body = {
            name
        }

        const { data } = await axios.put(`http://localhost:8000/library/books/${book.id}/`, body, config)
        console.log(data)
        router.push('/')


    }

    const handleDeleteClick = async (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken,
                'X-CSRFToken': csrftoken,
            }
        }

        const { data } = await axios.delete(`http://localhost:8000/library/books/${book.id}/`, config)
        console.log(data)
        router.push('/')
    }


  return (
    <div className="container my-3">
            <h2>Book Details</h2>

            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Name</label>
                    <input type="text" className="form-control" id="title" name="title" value={name} onChange={onChange} />
                </div>
                <button disabled={name.length < 5} type="submit" className="btn btn-primary me-2" onClick={handleUpdateClick}>Update Book</button>
                <button disabled={name.length < 5} type="submit" className="btn btn-primary mx-2" onClick={handleDeleteClick}>Delete Book</button>
            </form>
    </div>
  )
}

export default Book

export async function getServerSideProps({ query: { pid } }) {
    const { data } = await axios.get(`http://localhost:8000/library/books/${pid}`)
    // Fetch our data
    console.log(data)
    return {
      props: {
        book: data
      }
    }
  }