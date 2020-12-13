import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../App'
import {useHistory, Link} from 'react-router-dom'
import { toast } from 'react-toastify';

import './css/authentication.css'

const Authentication = () => {
    const {dispatch} = useContext(UserContext)
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem("admin"))
    useEffect(() => {
      if(user){
        dispatch({type: "USER", payload: user})
        history.push('/')
      }
    }, [])

    // const [confirmPassword, setConfirmPassword] = useState("")

    const PostData = (e) => {
        e.preventDefault()
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast.error("Invalid Email")
            return
        }
        setLoading(true)
        fetch("https://firstclassbrain-server.herokuapp.com/web/signin-admin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.error){
                    toast.error(data.error)
                    setLoading(false)
                }
                else{
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("admin", JSON.stringify(data.admin))
                    dispatch({type: "USER", payload: data.admin})
                    toast.success("Signed in successfully")
                    history.push('/')
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="authentication">
            <div className="image desktop"></div>

            <form onSubmit={PostData}>

                <div className="title">Are you an Admin? <span className="teal-background">Login now</span></div>

                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button 
                    disabled={loading ? true : false}
                    type="submit"
                    className={loading ? "disabled" : ""}
                >
                    {loading ? "LOADING.." : "LOGIN"}
                </button>

                <div><Link to='/forgot-password' className="extra">Forgot password?</Link></div>
            </form>
        </div>
    )
}

export default Authentication
