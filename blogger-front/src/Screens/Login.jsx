import '../App.css'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form)
    
    fetch('http://localhost:8000/api/login/', { method: form.method, body: formData,  credentials: "include" })
    .then(response => {
        if (response.ok) {
        navigate("/")
      }
      return response.json()
    })
    .catch(e => console.log(e))
  }
  
  return (
    <>
    <h1 style={{position:"absolute", top:"10px", left:"50px"}}>Login</h1>
    <div className="main-div">
      <form method="post" onSubmit={handleSubmit}>
        <label className="label-form"><h3>Username:</h3>  <input required type='text' name='username'/> </label>
        <label className="label-form"> <h3>Password:</h3> <input required type='password' name='password'/> </label>
        <br/>
        <input className="submit" type='submit' />
      </form>
      <Link to="/register"> Don't have an account? </Link>
    </div>
    </>
  )
}

export default Login