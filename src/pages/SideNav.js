import React, {useContext} from 'react'
import {UserContext} from '../App'
import {
    Link,
    useHistory
} from 'react-router-dom'
// css
import './css/navigation.css'
// image
import header from '../images/admin.png'
// icon
import dashboard_icon from '../icons/side-nav/dashboard.svg'
import courses_icon from '../icons/side-nav/courses.svg'
import tests_icon from '../icons/side-nav/tests.svg'
import user_icon from '../icons/side-nav/user.svg'
import logout_icon from '../icons/side-nav/logout.svg'

import dashboard_active from '../icons/side-nav/dashboard-active.svg'
import courses_active from '../icons/side-nav/courses-active.svg'
import tests_active from '../icons/side-nav/tests-active.svg'
import user_active from '../icons/side-nav/user-active.svg'

const SideNav = (props) => {
    const adminState = JSON.parse(localStorage.getItem("student"))
    const history = useHistory()
    const {dispatch} = useContext(UserContext)
    console.log()
    const page = `${props.page}`

    let dashboard = false
    let courses = false
    let tests = false
    let students = false

    switch(page){
        case "dashboard": dashboard =  true;
        break;
        case "courses": courses = true;
        break;
        case "tests": tests = true;
        break;
        case "students": students = true;
        break;
        default: props = ""
    }

    return (
        <div className={`side-nav ${props.styling}`}>
            <div className="profile desktop-hide">
                <div 
                    className="profile-picture"
                    style={{
                        backgroundImage: `url(${header})`,
                        backgroundSize:`cover`,
                        backgroundPosition:`center`
                    }}
                ></div>
            </div>

            <div className={`name title ${props.styling}`}>
                SUPER<span className="surname">ADMIN</span>
            </div>
            
            <div className="navigation-container">
                <Link className="link" to='/'>
                <div className={dashboard ? "item active" : "item"}>
                    <div className="sub-title">Dashboard</div> 
                    <div className="image"><img src={dashboard ? dashboard_active : dashboard_icon} alt="Dashboard" /></div>
                </div>
                </Link>
                
                <Link className="link" to='/courses'>
                <div className={courses ? "item active" : "item"}>
                    <div className="sub-title">Courses</div> 
                    <div className="image"><img src={courses ? courses_active : courses_icon} alt="Courses" /></div>
                </div>
                </Link>
                
                <Link className="link" to='/tests'>
                <div className={tests ? "item active" : "item"}>
                    <div className="sub-title">Tests</div> 
                    <div className="image"><img src={tests ? tests_active : tests_icon} alt="Tests" /></div>
                </div>
                </Link>
                
                <Link className="link" to='/students'>
                <div className={students ? "item active" : "item"}>
                    <div className="sub-title">Students</div> 
                    <div className="image"><img src={students ? user_active : user_icon} alt="Students" /></div>
                </div>
                </Link>
                
                <div 
                    className="item"
                    onClick={() => {
                        localStorage.clear()
                        dispatch({type: "CLEAR"})
                        history.push('/authentication')
                    }}
                >
                    <div className="sub-title">Logout</div> 
                    <div className="image"><img src={logout_icon} alt="Logout" /></div>
                </div>
                
            </div>
        </div>
    )
}

export default SideNav
