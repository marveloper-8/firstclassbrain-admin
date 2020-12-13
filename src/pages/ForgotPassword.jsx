import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import { toast } from 'react-toastify';

import './css/authentication.css'

const ForgotPassword = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)


    // const [confirmPassword, setConfirmPassword] = useState("")

    const PostData = (e) => {
        e.preventDefault()
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast.error("Invalid Email")
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
                    toast.error(data.error)
                    setLoading(false)
                }
                else{
                    toast.success("Check your email for your reset password link")
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
                    disabled={loading ? true : false}
                    type="submit"
                    className={loading ? "disabled" : ""}
                >
                    {
                        loading
                        ?
                        "LOADING.."
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
