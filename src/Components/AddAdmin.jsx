import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddAdmin = () => {

    const aId = React.useMemo(() => Math.floor(Math.random() * 100000 + 1), []);
    const [admin, setAdmin] = useState({
        email: "",
        password: "",
        adminId: aId
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/auth/add_admin', admin)   
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Add Admin</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="admin"><strong>Email:</strong></label>
                        <input type="text" placeholder='Enter email'
                            onChange={(e) =>
                                setAdmin({ ...admin, email: e.target.value })
                            } className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="admin"><strong>Password:</strong></label>
                        <input type="password" placeholder='Enter password'
                            onChange={(e) => setAdmin({ ...admin, password: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Add admin</button>
                </form>
            </div>
        </div>
    )
}

export default AddAdmin