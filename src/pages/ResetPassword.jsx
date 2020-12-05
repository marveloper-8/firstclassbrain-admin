import React, {useState} from 'react'

import {
    useHistory, 
    Link, 
    useParams
} from 'react-router-dom'

import M from 'materialize-css'

import './css/authentication.css'

const ForgotPassword = () => {    
    const history = useHistory()
    const {token} = useParams()
    const [loading, setLoading] = useState(false)

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
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                    setLoading(false)
                }
                else{
                    M.toast({html: "Password changed successfully", classes:"#c62828 teal darken-3"})
                    history.push('/authentication')
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    const NewPassword = e => {
        e.preventDefault()
        if(password === confirmPassword){
            ResetPassword()
        } else{
            alert("Password does not match")
        }
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
                    className="btn waves-effect waves-light #64b5f6 teal darken-1"
                >
                    {
                        loading
                        ?
                        <i class="fa fa-spinner fa-spin"></i>
                        :
                        "RESET PASSWORD"
                    }
                </button>

                <div><Link to='/authentication' className="extra">Go back to login</Link></div>
            </form>
        </div>
    )
}

export default ForgotPassword
