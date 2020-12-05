import React, {useState, useContext, useEffect, useCallback} from 'react'
import {UserContext} from '../App'
import {
    useParams,
    Link,
    useHistory
} from 'react-router-dom'

import Footer from './Footer'
import SideNav from './SideNav'
import Navigation from './Navigation'

import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'

import user from '../icons/user.svg'
import goal from '../icons/goal.svg'

function Terms() {
    const [data, setData] = useState([])

    const {state, dispatch} = useContext(UserContext)
    const {userId} = useParams()
    const history = useHistory()

    const [addCourse, setAddCourse] = useState(false)
    const [viewProfile, setViewProfile] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [otherName, setOtherName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")

    const [url, setUrl] = useState(undefined)
    
    useEffect(() => {
        fetch('/all-instructor', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setData(result.instructor)
            })
    }, [])
    
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

    const uploadFields = useCallback(() => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            alert("invalid email")
            return
        }
        fetch("/signup-instructor", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                otherName,
                email,
                phone,
                address,
                pic: url,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    alert(data.error)
                }
                else{
                    alert(data.message)
                    history.push('/instructors')
                }
            })
            .catch(err => {
                console.log(err)
            })
    })
    
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    }, [url, uploadFields])
    
    const PostSignup = () =>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }
    // end of signup

    
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
    
    return (
        <div className="dashboard">
            <SideNav page="instructors" />
            <div className="main-content">
                <Navigation page="instructors" image={user} />

                <section className="top-button">
                    <Link className='link' to='/add-instructor'>
                        <button>+ Add Course</button>
                    </Link>
                </section>
            
                <div className="table courses-table">
                    <div className="filter-columns">
                        <div className="add-instructors">
                            <button onClick={() => setAddCourse(!addCourse)}>+ Add Instructors</button>
                        </div>
                        
                        <div className="tab search-container">
                            <div className="search">
                                <input type="text" placeholder="Search..." />
                            </div>
                        </div>
                            
                    </div>

                    {
                        data.map(item => {
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
                                        <div className="view-profile">
                                            <button onClick={() => setViewProfile(!viewProfile)}>View Profile</button>
                                        </div>
                                    </div>

                                                                                
                                    <div className={viewProfile ? "popup-toggle popup" : "popup"}>
                                        <div className="background" onClick={() => setViewProfile(!viewProfile)}></div>
                                        <div className="view-profile-inner">
                                            <div className="navigation">
                                                <div className="title">View Profile</div>
                                                <div className="close">
                                                    <span onClick={() => setViewProfile(!viewProfile)}>&times;</span>
                                                </div>
                                            </div>
                                            
                                            <div className="data">
                                                <div 
                                                    className="image"
                                                    style={{
                                                        backgroundImage: `url(${item.pic})`,
                                                        backgroundSize:`cover`,
                                                        backgroundPosition:`center`
                                                    }}
                                                ></div>

                                                <div className="name">{item.firstName} {item.otherName} {item.lastName}</div>

                                                <div className="tab">
                                                    <div className="icon">
                                                        <img src={goal} alt="phone icon" />
                                                    </div>
                                                    <div className="value">
                                                        +234(0){item.phone}
                                                    </div>
                                                </div>

                                                <div className="tab">
                                                    <div className="icon">
                                                        <img src={goal} alt="email icon" />
                                                    </div>
                                                    <div className="value">
                                                        {item.email}
                                                    </div>
                                                </div>

                                                <div className="tab">
                                                    <div className="icon">
                                                        <img src={goal} alt="address icon" />
                                                    </div>
                                                    <div className="value">
                                                        {item.address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                            
                                </div>   
                            )
                        })
                    }
                </div>

                <Footer />
            </div>
        
            <div className={addCourse ? "popup-toggle popup" : "popup"}>
                <div className="background" onClick={() => setAddCourse(!addCourse)}></div>
                <div className="instructors-inner">
                    <div className="navigation">
                        <div className="title">Add New Instructor</div>
                        <div className="close">
                            <span onClick={() => setAddCourse(!addCourse)}>&times;</span>
                        </div>
                    </div>
                    
                    <div className="form">
                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="Last Name" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="Other Name" 
                                value={otherName}
                                onChange={(e) => setOtherName(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="input input-file">
                            <span>Upload Profile Picture +</span>
                            <input
                                placeholder="Upload Profile Picture" 
                                type="file" 
                                autoComplete="off"
                                onChange={onSelectFile}  
                            />
                        </div>

                        {image && <img src={preview} alt="profile preview" className="course-thumbnail" />}

                        <div className="input">
                            <input
                                type="phone" 
                                placeholder="Phone" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="Address" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="input">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="input">
                            <button onClick={() => PostSignup()} className="upload-button">Upload Material</button>
                        </div>
                    </div>
                </div>
            </div> 
              
        </div>
    )
}

export default Terms
