import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../App'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

import Footer from './Footer'
import Navigation from './Navigation'

import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'

import dashboard from '../icons/dashboard.svg'
import search_icon from '../icons/search.svg'
import emailIcon from '../icons/email.svg'
import phoneIcon from '../icons/call-two.svg'
import passwordIcon from '../icons/password.svg'
import pictureIcon from '../icons/picture.svg'
import userIcon from '../icons/user.svg'

function Terms() {
    // authentication
    const history = useHistory()
    const {dispatch} = useContext(UserContext)
    const user = JSON.parse(localStorage.getItem("admin"))

    useEffect(() => {
      if(user){
        dispatch({type: "USER", payload: user})
      } else{
        history.push('/authentication')
      }
    }, [])
    // authentication end 

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [student, setStudent] = useState([])
    const [instructor, setInstructor] = useState([])
    const [tests, setTests] = useState([])

    const [sideNav, setSideNav] = useState(false)

    const [instructors, setInstructors] = useState(false)
    const [createInstructors, setCreateInstructors] = useState(false)

    const [firstName, setFirstName] = useState("First Name")
    const [lastName, setLastName] = useState("Last Name")
    const [email, setEmail] = useState("Email")
    const [phone, setPhone] = useState("Phone")
    const [password, setPassword] = useState("Password")
    const [confirmPassword, setConfirmPassword] = useState("")
    const originalPassword = password

    const [url, setUrl] = useState(undefined)

    
    const [image, setImage] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!image) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setImage(e.target.files[0])
    }
    
    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","ao-estate")
        data.append("cloud_name","josh-equere")
        fetch("https://api.cloudinary.com/v1_1/josh-equere/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const openSideNav = () => {
        setSideNav(!sideNav)
    }

    const uploadFields = () => {
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            alert("invalid email")
            return
        }
        setLoading(true)
        fetch("https://firstclassbrain-server.herokuapp.com/signup-instructor", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phone,
                pic: url,
                originalPassword,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                    setLoading(false)
                } else{
                    M.toast({html: "Password changed successfully", classes:"#c62828 teal darken-3"})
                    history.push('/')
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    const PostSignup = (e) =>{
        e.preventDefault()
        if (password == confirmPassword){
            if(image){
                uploadPic()
            }else{
                uploadFields()
            }
        } else{
            M.toast({html: "Password does not match", classes:"#c62828 red darken-3"})
            setLoading(false)
        }
        
    }

    useEffect(()=>{
        fetch('https://firstclassbrain-server.herokuapp.com/all-courses', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setData(result.posts)
            })

    },[])

    useEffect(()=>{
        fetch('https://firstclassbrain-server.herokuapp.com/all-instructor', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setInstructor(result.instructor)
            })
    },[])

    useEffect(()=>{
        fetch('https://firstclassbrain-server.herokuapp.com/all-student', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setStudent(result.student)
            })
    },[])
    
    useEffect(()=>{
        fetch(`https://firstclassbrain-server.herokuapp.com/all-tests`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setTests(result.tests)
            })
    },[])
    
    return (
        <div className="dashboard">
            {/* <SideNav page="dashboard" /> */}

            <div className="main-content">
                <Navigation page="dashboard" image={dashboard} />

                <div className="content">
                    <div className="head">Student Attendance</div>
                    <div className="chart" onClick={() => openSideNav}></div>
                </div>
                
                <div className="content">
                    <div className="head">Instructor's Information</div>
                    <div className="information">
                        <Link className="link" to='/students'>
                        <div className="tab">
                            <div className="value title">{student.length}</div>
                            <div className="label">Number of Students</div>
                        </div>
                        </Link>
                        
                        <Link className="link" to='/courses'>
                        <div className="tab">
                            <div className="value title">{data.length}</div>
                            <div className="label">Number of Courses</div>
                        </div>
                        </Link>
                        
                        <Link className="link" to='/tests'>
                        <div className="tab">
                            <div className="value title">{tests.length}</div>
                            <div className="label">Number of Tests</div>
                        </div>
                        </Link>
                        
                        <div className="tab instructors-tab" onClick={() => setInstructors(!instructors)}>
                            <div className="value title">{instructor.length}</div>
                            <div className="label">Number of Instructors</div>
                        </div>
                        
                    </div>
                </div>

                <Footer />
            </div>
        
            <div className={instructors ? "open-instructors" : "close-instructors"}>
                <div className="instructors-information-background" onClick={() => setInstructors(!instructors)}></div>
                <div className="instructors-information-inner">
                    
                    <div className="content">
                        <span className="close" onClick={() => setInstructors(!instructors)}>
                            &times;
                        </span>
                        <button className="add-instructors" onClick={() => setCreateInstructors(!createInstructors)}>+ ADD INSTRUCTOR</button>
                        <div className="search">
                            <img src={search_icon} alt="search" />

                            <input type="text" className="search" />
                        </div>

                        <div className="instructor-list">
                            {
                                instructor.map(item => {
                                    return(
                                        <div className="columns">
                                            <div 
                                                className="image"
                                                style={{
                                                    backgroundImage: `url(${item.pic})`,
                                                    backgroundSize:`cover`,
                                                    backgroundPosition:`center`
                                                }}
                                            ></div>
                
                                            <div className="tab">
                                                <div className="name">
                                                    {item.firstName} {item.lastName}
                                                </div>
                                                <div className="email">
                                                    {item.email} | {item.phone}
                                                </div>
                                            </div>
                                        </div>   
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>

            <div className={createInstructors ? "popup-toggle popup" : "popup"}>
                <div className="background" onClick={() => setCreateInstructors(!createInstructors)}></div>
                <div className="inner">
                    <div className="close-donate">
                        <span onClick={() => setCreateInstructors(!createInstructors)}>
                            &times; close
                        </span>
                    </div>

                    <div className="content">
                        <form className="text" onSubmit={PostSignup}>
                            <h1 className="title">SIGN UP AN INSTRUCTOR</h1>

                            <input type="text" value={originalPassword} />

                            <div className="input">
                                <img src={userIcon} alt="first name" />
                                <input 
                                    type="text" 
                                    placeholder="First Name" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="input">
                                <img src={userIcon} alt="last name" />
                                <input 
                                    type="text" 
                                    placeholder="Last Name" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="input">
                                <img src={emailIcon} alt="email" />
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="input">
                                <img src={phoneIcon} alt="phone" />
                                <input 
                                    type="phone" 
                                    placeholder="Phone" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="input">
                                <img src={pictureIcon} alt="phone" />
                                <div className="input-file">
                                    <span>Upload Profile Picture +</span>
                                    <input
                                        className="input" 
                                        type="file"
                                        onChange={onSelectFile}
                                    />
                                </div>
                            </div>

                            {image && <img src={preview} alt="profile preview" className="preview-picture" />}

                            <div className="input">
                                <img src={passwordIcon} alt="password" />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="input">
                                <img src={passwordIcon} alt="password" />
                                <input 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required 
                                />
                            </div>

                            <button 
                                type="submit"
                                className="btn waves-effect waves-light #64b5f6 teal darken-1"
                            >
                                {
                                    loading
                                    ?
                                    <i class="fa fa-spinner fa-spin"></i>
                                    :
                                    "CREATE ACCOUNT"
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>

                
        </div>
    )
}

export default Terms
