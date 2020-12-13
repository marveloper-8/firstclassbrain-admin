import React, {useState} from 'react'

import {
    useHistory, 
    Link, 
    useParams
} from 'react-router-dom'

import { toast } from 'react-toastify';

import './css/authentication.css'

const ForgotPassword = () => {    
    const history = useHistory()
    const {token} = useParams()
    const [loading, setLoading] = useState(false)
    let passwordConfirmation = false

    const ResetPassword = (e) => {
        e.preventDefault()
        setLoading(true)
        fetch("https://firstclassbrain-server.herokuapp.com/admin/new-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, token})
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

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    return (
        <div className="authentication">
            <div className="image desktop"></div>

            <form onSubmit={ResetPassword}>
                <div className="title">Input your new password</div>

                <input 
                    type="password" 
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input 
                    type="password" 
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button 
                    type="submit"
                    className={loading ? "disabled" : ""}
                    disabled={
                        password != confirmPassword || loading
                        ?
                        true
                        :
                        false
                    }
                >
                    { loading ? "LOADING.." : "CREATE NEW PASSWORD"}
                </button>

                <div className="warning">
                    {password != confirmPassword ? "Password doesn't match..." : ''}
                </div>
                
                {/* <div className="warning">
                    {password.length < 10 ? "Password is too short" : ''}
                </div> */}
                

                <div><Link to='/authentication' className="extra">Go back to login</Link></div>
            </form>
        </div>
    )
}

export default ForgotPassword
