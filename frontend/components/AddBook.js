import React, { useContext, useState } from 'react'
import axios from 'axios'
import authContext from '../context/authContext'
import { useRouter } from 'next/router'

const AddNote = (props) => {
  const router = useRouter()

    const { accessToken } = useContext(authContext)

    const [note, setNote] = useState({ title: "" })

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

    const handleClick = async (e) => {
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
            name: note.title
        }

        const { data } = await axios.post("http://localhost:8000/library/books/", body, config)
        console.log(data)
        router.push('/')


    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h2>Add a Book</h2>

            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Name</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                </div>
                <button disabled={note.title.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Book</button>
            </form>
        </div>
    )
}

export default AddNote