import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../App'
import {useHistory, Link} from 'react-router-dom'
import M from 'materialize-css'

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
            M.toast({html: "Invalid email", classes:"#c62828 red darken-3"})
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
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                    setLoading(false)
                }
                else{
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("admin", JSON.stringify(data.admin))
                    dispatch({type: "USER", payload: data.admin})
                    M.toast({html: "Signed in successfully", classes:"#c62828 teal darken-3"})
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
                    type="submit"
                    className="btn waves-effect waves-light #64b5f6 teal darken-1"
                >
                    {
                        loading
                        ?
                        <i class="fa fa-spinner fa-spin"></i>
                        :
                        "LOGIN"
                    }
                </button>

                <div><Link to='/forgot-password' className="extra">Forgot password?</Link></div>
            </form>
        </div>
    )
}

export default Authentication
