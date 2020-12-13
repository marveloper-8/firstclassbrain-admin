import React, {useState, useEffect, useContext, useCallback} from 'react'
import {Chart} from 'react-charts'
import {UserContext} from '../App'
import {Link, useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
// components
import useChartConfig from './components/charts/useChartConfig'
import Box from './components/charts/Box'
import SyntaxHighlighter from './components/charts/SyntaxHighlighter'
import Footer from './Footer'
import Navigation from './Navigation'
// css
import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'
// icons
import deleteIcon from '../icons/delete.svg'
import dashboard from '../icons/dashboard.svg'
import emailIcon from '../icons/email.svg'
import phoneIcon from '../icons/call-two.svg'
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

    // random password
    const randomPassword = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
    // random password end

    const [firstName, setFirstName] = useState("FirstName")
    const [lastName, setLastName] = useState("LastName")
    const [email, setEmail] = useState("user@email.com")
    const [phone, setPhone] = useState("Phone")
    const [password] = useState(randomPassword(15))
    const [originalPassword] = useState(password)

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

    const uploadFields = useCallback(() => {
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast.error("Invalid email")
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
                    toast.error(data.error)
                    setLoading(false)
                } else{
                    toast.success("Instructor created successfully")
                    history.push('/courses')
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    })
    
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    }, [])
    const PostSignup = (e) =>{
        e.preventDefault()
        if(image){
            uploadPic()
        }else{
            uploadFields()
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

    const [searchInstructors, setSearchInstructors] =  useState("")

    const deleteInstructor = postId => {
        fetch(`https://firstclassbrain-server.herokuapp.com/delete-instructor/${postId}`, {
            method: "delete",
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            toast.dark("Deleted successfully")
            history.push('/authentication')
        })
    }

    const instructorCount = 6

    const chartData = React.useMemo(
        () => [
            // {
            // label: 'Users and Items',
            // data: [
            //     [0, instructor.length], 
            //     [1, student.length], 
            //     [2, data.length], 
            //     [3, tests.length]
            // ]}
                    
            [
                [1, 3], 
                [2, instructorCount], 
                [3, 1], 
                [4, 5]
            ],
        ],
        []
    )

    

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    
    return (
        <div className="dashboard">
            {/* <SideNav page="dashboard" /> */}

            <div className="main-content">
                <Navigation page="dashboard" image={dashboard} />

                <div className="content">
                    <div className="head">Student Attendance</div>
                    <div className="chart">
                        <Chart 
                            data={chartData} 
                            axes={axes}
                            tooltip
                        />
                    </div>
                </div>
                
                <div className="content">
                    <div className="head">Admin's Information</div>
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
                        <input type="search" 
                            onChange={e => {
                                const test = instructor.filter(item => {
                                  return item.toString().toLowerCase().includes(e.target.value.toLowerCase());
                                });
                                console.log("test: ", test);
                      
                                // uncomment line below and teams is logged as I want
                                setInstructor(test);
                                setSearchInstructors(e.target.value);
                            }}
                            value={searchInstructors}
                            className="search" 
                            placeholder="Search by first name..."
                        />

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
                                                    <a className="links" href={`mailto:${item.email}`}>
                                                        {item.email}
                                                    </a>
                                                    &nbsp; | &nbsp; 
                                                    <a className="links" href={`tel:0${item.phone}`}>
                                                        0{item.phone}
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="delete-tab">
                                                <img 
                                                    className="delete-icon" 
                                                    src={deleteIcon} 
                                                    alt="delete" 
                                                    onClick={() => deleteInstructor(item._id)}
                                                />
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
                            <h1 className="title">CREATE AN INSTRUCTOR</h1>

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

                            <button 
                                type="submit"
                                className={ loading || phone.length != 11 || isNaN(phone) ? "disabled" : "" }
                                disabled = { loading || phone.length != 11 || isNaN(phone) ? true : false }
                            >
                                { loading ? "LOADING.." : "CREATE ACCOUNT" }
                            </button>
                            <div className="warning">
                                {
                                    phone.length == 11
                                    ?
                                    ""
                                    :
                                    "Phone number must be eleven (11) digits"
                                }
                            </div>
                            <div className="warning">
                                {
                                    isNaN(phone)
                                    ?
                                    "Must be a valid phone number starting with 0 (zero)"
                                    :
                                    ""
                                }
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>

                
        </div>
    )
}

export default Terms
