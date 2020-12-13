import React, {useState, useEffect, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
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
import giftIcon from '../icons/gift.svg'
import deleteIcon from '../icons/delete.svg'
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

    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('https://firstclassbrain-server.herokuapp.com/all-student', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setData(result.student)
            })
    },[])

    const deleteStudent = postId => {
        fetch(`https://firstclassbrain-server.herokuapp.com/delete-student/${postId}`, {
            method: "delete",
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            toast.dark("Delete successful")
            history.push('/')
        })
    }
    
    return (
        <div className="dashboard">
            <div className="main-content">
                <Navigation page="students" image={userIcon} />

                <div className="students-data-container">
                    <div className="table">
                        <div className="filter-columns">
                            
                            <div className="tab">
                                <select className="sub-title">
                                    {
                                        classes.map(item => {
                                            return(
                                                <option value={item.class} selected>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            
                            <div className="tab">
                                <input type="text" className="search" placeholder="Search..." />
                            </div>
                                
                        </div>

                        {
                            data.map(item => {
                                let compsClass = ""
    
                                switch(`${item.classSelected}`){
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

                                return(
                                    <>
                                        <div className="columns desktop">
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
                                            </div>
                
                                            <div className="tab">
                                                <div className="item">
                                                    <a className="links" href={`mailto:${item.email}`}>
                                                        {item.email}
                                                    </a>
                                                </div>
                                            </div>
                
                                            <div className="tab">
                                                <div className="item">
                                                    <a className="links" href={`tel:0${item.phone}`}>
                                                        0{item.phone}
                                                    </a>
                                                </div>
                                            </div>
                
                                            <div className="tab">
                                                <div className="item">
                                                    {compsClass}
                                                </div>
                                            </div>
                
                                            <div className="tab">
                                                <div className="item">
                                                    <img 
                                                        className="link"
                                                        src={video_call} 
                                                        alt="video call" 
                                                    />
                                                </div>
                                            </div>
                
                                            <div className="tab">
                                                <div className="item">
                                                    <img 
                                                        className="link"
                                                        src={text_message} 
                                                        alt="text" 
                                                    />
                                                </div>
                                            </div>
                
                                            <div className="tab">
                                                <div className="item">
                                                    <img 
                                                        className="link"
                                                        src={giftIcon} 
                                                        alt="gift" 
                                                    />
                                                </div>
                                            </div>
                
                                            <div className="tab">
                                                <div className="item">
                                                    <img 
                                                        className="link"
                                                        src={deleteIcon} 
                                                        alt="delete" 
                                                        onClick={() => deleteStudent(item._id)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <Link className="link mobile" to={'/student-info/' + item._id}>
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
                                                </div>
                                            </div>
                                        </Link>
                                        
                                    
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                
                <Footer />
            </div>
            
        </div>
    )
}

export default Terms
