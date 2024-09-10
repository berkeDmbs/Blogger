import '../App.css'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        
        fetch('http://localhost:8000/api/register/', { method: form.method, body: formData, credentials: "include" })
        .then(response => {
            if (response.ok) {
                fetch('http://localhost:8000/api/login/', { method: form.method, body: formData,  credentials: "include" })
                .then(response => {
                    if (response.ok) {
                        navigate("/")
                    }
                return response.json()
                })
          }
          return response.json()
        })
        .catch(e => console.log(e))
    }
    
    return(
        <>
        <h1 style={{position:"absolute", top:"10px", left:"50px"}}>Register</h1>
        <div className="main-div">
            <form method="post" onSubmit={handleSubmit}>
                <label className="label-form"> <h3>First Name:</h3> <input required type='text' name='firstname'/> </label>
                <label className="label-form"> <h3>Last Name:</h3> <input required type='text' name='lastname'/> </label>
                <label className="label-form"><h3>Username:</h3>  <input required type='text' name='username'/> </label>
                <label className="label-form"> <h3>Password:</h3> <input required type='password' name='password'/> </label>
                <br/>
                <input className="submit" type='submit' />
            </form>
            <Link to="/login"> Already have an account? </Link>
        </div>
        </>
    )
}

export default Register