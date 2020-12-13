import React, {useState, useEffect, useContext} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import {UserContext} from '../App'
// components
import Footer from './Footer'
import Navigation from './Navigation'
// css
import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'
// icons
import userIcon from '../icons/user.svg'
import video_call from '../icons/video-call.svg'
import text_message from '../icons/text-message.svg'
import phone_svg from '../icons/phone.svg'
import email_svg from '../icons/email.svg'
// data
import classes from '../data/classes.json'

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

    const {studentId} = useParams()
    console.log(studentId)

    const [studentDetails, setStudentDetails] = useState([])

    // course details
    useEffect(() => {
        fetch(`https://firstclassbrain-server.herokuapp.com/student-details/${studentId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setStudentDetails(result.student)
            })
    }, [studentId])

    

    const deletePost = studentId => {
        setLoading(true)
        fetch(`https://firstclassbrain-server.herokuapp.com/delete-student/${studentId}`, {
            method: "delete",
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            toast.dark("Delete successful")
            history.push('/students')
        })
    }

    const [loading, setLoading] = useState(false)
    
    let compsClass = ""
    
    switch(`${studentDetails.classSelected}`){
        case `1`: compsClass = "Basic 1";
        break;
        case `2`: compsClass = "Basic 2";
        break;
        case `3`: compsClass = "Basic 3";
        break;
        case `4`: compsClass = "Basic 4";
        break;
        case `5`: compsClass = "Basic 5";
        break;
        case `6`: compsClass = "JSS 1";
        break;
        case `7`: compsClass = "JSS 2";
        break;
        case `8`: compsClass = "JSS 3";
        break;
        case `9`: compsClass = "SSS 1 (Sci)";
        break;
        case `10`: compsClass = "SSS 1 (Comm)";
        break;
        case `11`: compsClass = "SSS 1 (Art)";
        break;
        case `12`: compsClass = "SSS 2 (Sci)";
        break;
        case `13`: compsClass = "SSS 2 (Comm)";
        break;
        case `14`: compsClass = "SSS 2 (Art)";
        break;
        case `15`: compsClass = "SSS 3 (Sci)";
        break;
        case `16`: compsClass = "SSS 3 (Comm)";
        break;
        case `17`: compsClass = "SSS 3 (Art)";
        break;
        default: compsClass = "Classroom"
    }
    
    return (
        <div className="dashboard">
            <div className="main-content">
                <Navigation page="students" image={userIcon} />

                <div className="profile-container">
                    <div className="profile-image"
                        style={{
                            backgroundImage: `url(${studentDetails ? studentDetails.pic : "loading"})`,
                            backgroundSize:`cover`,
                            backgroundPosition:`center`
                        }}
                    ></div>
                    <div className="name">
                        {studentDetails ? studentDetails.firstName : "loading"} 
                        {studentDetails ? studentDetails.lastName : "loading"}
                    </div>
                    <div className="text">
                        {studentDetails ? studentDetails.email : "loading"}
                    </div>
                    <div className="text">
                        0{studentDetails ? studentDetails.phone : "loading"}    
                    </div>
                    <div className="text">
                        {compsClass}
                    </div>
                    <div className="widgets">
                        <div><img src={video_call} alt="video call" /></div>
                        <div><img src={text_message} alt="text message" /></div>
                        <div>
                            <a className="links" href={`mailto:${studentDetails ? studentDetails.email : "loading"}`}>
                                <img src={email_svg} alt="email" />
                            </a>
                        </div>
                        <div>
                            <a className="links" href={`tel:0${studentDetails ? studentDetails.phone : "loading"}`}>
                                <img src={phone_svg} alt="phone" />
                            </a>
                        </div>
                    </div>
                    <div className="actions">
                        <button className="gift">GIFT SUBSCRIPTION</button>

                        <button 
                            onClick={() => deletePost(`${studentDetails ? studentDetails._id : "loading"}`)}
                            className={loading ? "delete-disabled mobile" : "delete mobile"}
                            disabled = {loading ? true : false}
                        >
                            {loading ? "LOADING.." : "DELETE THIS COURSE"}
                        </button>
                    </div>
                </div>
        
                <Footer />
            </div>
            
        </div>
    )
}

export default Terms
