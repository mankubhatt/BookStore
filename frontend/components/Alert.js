import React, { useContext, useEffect } from 'react'
import authContext from '../context/authContext'

export default function Alert(props) {
    const {handleError} = useContext(authContext)
    useEffect(() => {
        setTimeout(() => {
            handleError()
        }, 5000);
    }, [props.alert])
    
    return (
        props.alert && 
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error</strong>: {props.alert}
        </div>
    )
}