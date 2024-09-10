import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from './Screens/Login'
import Register from './Screens/Register'
import Home from './Screens/Home'
import Search from './Screens/Search'
import Profile from './Screens/Profile'

function App() {

  return (
   <Router>
    <Routes>
      <Route element={<Home/>} path='/' />
      <Route element={<Login/>} path='/login' />
      <Route element={<Register/>} path='/register' />
      <Route element={<Search/>} path='/search/:pk' />
      <Route element={<Profile/>} path='/profile'/>
    </Routes>
   </Router>
  )
}

export default App
