import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


const Employee = () => {
  const [employee, setEmployee] = useState([])


  const handleDelete = (e) => {
    const flag = confirm("Are you sure to delete Employee")
    if (flag) {
      axios.post('http://localhost:3000/auth/employee_delete/' + e.target.value)
        .then(result => {
          if (!result.data.Status) {

            alert(result.data.Error)

          }
        }).catch(err => console.log(err))
    }
  }
  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [handleDelete])
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>EmployeeId</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>


            </tr>
          </thead>
          <tbody>
            {
              employee.map((e, index) => (
                <tr key={index}>
                  <td>{e.name}</td>
                  <td>{e.employeeId}</td>
                  <td><img src={`http://localhost:3000/server/public/Images/` + e.image} className='employee-img' alt="image" /></td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>

                  <td>
                    <Link to={`/dashboard/edit_employee/` + e.employeeId} className='btn btn-primary btn-sm me-2' >Edit</Link>
                    <button onClick={handleDelete} value={e.employeeId} className='btn btn-sm btn-danger' >Delete</button>
                  </td>



                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee