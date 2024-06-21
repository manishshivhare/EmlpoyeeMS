import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditAdmin = () => {

    const { id } = useParams()
    const [password, setPassword] = useState({
        
        password: ''
    })
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/auth/edit_admin_password/' + id, password)
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard')
                alert(result.data.Message)
            }else{
                alert(result.data.Error)
            }
        })
    }



    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Admin</h3>
                <form className="row g-1" onSubmit={handleSubmit}>


                    <div className="col-12 mb-2">
                        <label htmlFor="inputPassword4" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            id="inputPassword4"
                            placeholder="Enter Password"
                            
                            onChange={(e) =>
                                setPassword({ ...password, password: e.target.value })
                            }
                        />

                    </div>



                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Update password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditAdmin