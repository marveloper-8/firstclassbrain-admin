import React, {useState, useEffect} from 'react'
// components
import Footer from './Footer'
import Navigation from './Navigation'
// css
import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'
// icons
import user from '../icons/user.svg'
import video_call from '../icons/video-call.svg'
import text_message from '../icons/text-message.svg'
import phone_svg from '../icons/phone-svg.svg'
import email_svg from '../icons/email-svg.svg'
// data
import classes from '../data/classes.json'

function Terms() {
    const [data, setData] = useState([])
    let firstName = "Student"
    let lastName = "Name"
    let email = "student@email.com"
    let phone = "0900-XXX-XXXX"
    let classSelected = "Student Class"

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
    
    return (
        <div className="dashboard">
            <div className="main-content">
                <Navigation page="students" image={user} />

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
                                            <button className="desktop-hide">View User</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                    <div className="profile-container desktop-hide">
                        <div className="profile-image"></div>
                        <div className="name">
                            {firstName} {lastName}
                        </div>
                        <div className="text">{email}</div>
                        <div className="text">{phone}</div>
                        <div className="text">{classSelected}</div>
                        <div className="widgets">
                            <div><img src={video_call} alt="video call" /></div>
                            <div><img src={text_message} alt="text message" /></div>
                            <div><img src={phone_svg} alt="phone" /></div>
                            <div><img src={email_svg} alt="email" /></div>
                        </div>
                        <div className="actions">
                            <button className="gift">GIFT SUBSCRIPTION</button>
                            <button className="delete">DELETE ACCOUNT</button>
                        </div>
                    </div>
                    
                    <div className="message-container desktop-hide">
                        <div className="void">Select a message thread to read it here</div>
                    </div>
                </div>
                
                <Footer />
            </div>
            
        </div>
    )
}

export default Terms
