import React, {useContext, useState} from 'react'
import {UserContext} from '../App'
import {
    Link,
    useHistory
} from 'react-router-dom'
// commponents
import SideNav from './SideNav'
// css
import './css/navigation.css'
// image
import header from '../images/admin.png'
// icon
import logout_icon from '../icons/logout.svg'

const Terms = (props) => {
    const {dispatch} = useContext(UserContext)
    const history = useHistory()
    const [openSidenav, setOpenSidenav] = useState(false)

    const page = `${props.page}`
    const image = `${props.image}`

    const OpenNav = () => {
        setOpenSidenav(!openSidenav)
    }
    
    return (
        <div className="navigation">
            <SideNav page={props.page} styling={openSidenav ? "slide-out" : "slide-in"} />

            <span onClick={() => OpenNav()} className={openSidenav ? "close-nav close-nav-show mobile-hide" : "close-nav close-nav-hide mobile-hide"}>&times;</span>

            <div className="mobile-hide profile-container">
                <div 
                    className={openSidenav ? "profile-picture profile-picture-open" : "profile-picture"}
                    style={{
                        backgroundImage: `url(${header})`,
                        backgroundSize:`cover`,
                        backgroundPosition:`center`
                    }}
                    onClick={() => OpenNav()}
                ></div>
            </div>

            <div className="title">
                <Link className="link" to='/'>
                    <img src={image} alt={page} /> 
                    <span className="desktop-hide"> {page}</span>
                </Link>
            </div>

            <div className="logout">
                <img 
                    src={logout_icon} 
                    alt="Logout" 
                    onClick={() => {
                        localStorage.clear()
                        dispatch({type: "CLEAR"})
                        history.push('/authentication')
                    }}
                />
            </div>
        </div>
    )
}

export default Terms
