import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar"

function Profile() {
    const [user, setUser] = useState({})
    const [userPk, setUserPk] = useState("")
    const [csrftoken, setCsrftoken] = useState('')

    useEffect(()=>{
        fetch('http://localhost:8000/api/profile', {method: "GET", credentials: "include"})
        .then(response=> {
            setCsrftoken(response.headers.get('X-CSRFTOKEN'))
            return response.json()})
        .then(data=> {
            setUserPk(JSON.parse(data)[0].pk)
            setUser(JSON.parse(data)[0].fields)})
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        fetch('http://localhost:8000/api/profile/', { method: form.method, body: formData, headers: {
            "X-CSRFTOKEN": csrftoken
        }, credentials: "include" })
        .then(response=> {
            if(response.ok) {
                window.location.reload()
            }
        })
    }

    return(
        <>
        <Navbar user={user}/>
        <div style={{ marginTop: 100}}>
            <h1 style={{position: 'fixed', left: '5%', top: '10%'}}>Change Profile Settings</h1>
            <form method="post" onSubmit={handleSubmit}>
                <label className="label-form"> <h3>First Name:</h3> <input required type='text' placeholder={user.first_name} name='firstname'/> </label>
                <label className="label-form"> <h3>Last Name:</h3> <input required type='text' placeholder={user.last_name} name='lastname'/> </label>
                <label className="label-form"><h3>Username:</h3>  <input required type='text' placeholder={user.username} name='username'/> </label>
                <input type="hidden" name="pk" value={userPk}/>
                <br/>
                <input className="submit" type='submit' />
            </form>
        </div>
        </>
    )
}

export default Profile