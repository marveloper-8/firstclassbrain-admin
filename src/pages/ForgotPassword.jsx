import React, {useState, useContext} from 'react'
import {UserContext} from '../App'
import {useHistory, Link} from 'react-router-dom'
import M from 'materialize-css'

import './css/authentication.css'

const ForgotPassword = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)


    // const [confirmPassword, setConfirmPassword] = useState("")

    const PostData = (e) => {
        e.preventDefault()
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email", classes:"#c62828 red darken-3"})
            return
        }
        setLoading(true)
        fetch("https://firstclassbrain-server.herokuapp.com/admin/reset-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                    setLoading(false)
                }
                else{
                    M.toast({html: "Check your email for the reset password link", classes:"#c62828 teal darken-3"})
                    history.push('/authentication')
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
                <div className="title">Forgot password?</div>

                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        "EMAIL ME A LINK"
                    }
                </button>

                <div><Link to='/authentication' className="extra">Go back to login</Link></div>
            </form>
        </div>
    )
}

export default ForgotPassword
