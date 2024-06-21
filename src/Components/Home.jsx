import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  const handleAdminDelete = (e) => {
    const flag = confirm("Are you sure to delete admin")
    if (flag) {
      axios.post('http://localhost:3000/auth/admin_delete/' + e.target.value)
        .then(result => {
          if (!result.data.Status) {
            alert(result.data.Error)
          } else {

          }
        })
        .catch(err => alert(err))
    }


  }

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, [handleAdminDelete])

  const adminRecords = () => {
    axios.get('http://localhost:3000/auth/admins_data')
      .then(result => {
        if (result.data.Status) {


          setAdmins(result.data.Result)

        } else {
          alert(result.data.Error)
        }
      })
  }
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admins_data')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result.length)

        }
      })
  }

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setemployeeTotal(result.data.Result.length)
        }
      })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/employee')

      .then(result => {
        if (result.data.Status) {
          const eList = result.data.Result
          var totalSalary = 0;
          eList.map(e => {
            totalSalary += e.salary;
          })
          setSalaryTotal(totalSalary)
        } else {
          alert(result.data.Error)
        }
      })
  }



  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
      <Link to="/dashboard/add_admin" className='btn btn-success mb-1'>Add new Admin</Link>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>AdminId</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map((a, i) => (
                <tr key={i}>
                  <td>{a.email}</td>
                  <td>{a.adminId}</td>
                  <td>
                    <Link to={`/dashboard/edit_admin/` + a.adminId} className='btn btn-primary btn-sm me-2' >Edit password</Link>
                    <button
                      value={a.adminId}
                      onClick={handleAdminDelete}
                      className="btn btn-warning btn-sm" >
                      Delete
                    </button>
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

export default Home