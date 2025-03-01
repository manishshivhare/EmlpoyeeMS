
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from "./Components/Login"
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddAdmin from './Components/AddAdmin.jsx'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee';
import EditAdmin from './Components/EditAdmin';
import PrivateRoute from './Components/PrivateRoute';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/dashboard' element={
          <PrivateRoute >
            <Dashboard />
          </PrivateRoute >
        }>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/employee' element={<Employee />}></Route>
          <Route path='/dashboard/category' element={<Category />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
          <Route path='/dashboard/edit_admin/:id' element={<EditAdmin />}></Route>
          <Route path='/dashboard/add_admin/' element={<AddAdmin />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
