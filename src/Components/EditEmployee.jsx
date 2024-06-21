import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const EditEmployee = () => {


    const [category, setCategory] = useState([])
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee/' + id)
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    const [employee, setEmployee] = useState({
        name: "",
        employeeId: id,
        email: "",
        password: "",
        salary: "",
        address: "",
        category_id: "",

    })
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();


        axios
            .put(`http://localhost:3000/auth/edit_employee/` + id, employee)
            .then((result) => {
                if (result.data.Status) {
                    navigate("/dashboard/employee");
                    alert(result.data.Message)
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    };


    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add Employee</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            value={employee.name}
                            onChange={(e) =>
                                setEmployee({ ...employee, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            value={employee.email}
                            onChange={(e) =>
                                setEmployee({ ...employee, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputPassword4" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            id="inputPassword4"
                            placeholder="Enter Password"

                            onChange={(e) =>
                                setEmployee({ ...employee, password: e.target.value })
                            }
                        />
                        <label for="inputSalary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
                            value={employee.salary}
                            onChange={(e) =>
                                setEmployee({ ...employee, salary: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete="off"
                            value={employee.address}
                            onChange={(e) =>
                                setEmployee({ ...employee, address: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="category" className="form-label">
                            Category
                        </label>
                        <select name="category" id="category" className="form-select"
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>

                            <option value='' >Select category</option>
                            {category.map((c) => {
                                return <option value={c.id}>{c.name}</option>;
                            })}
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Update Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEmployee