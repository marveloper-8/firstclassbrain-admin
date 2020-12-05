import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
// components
import Footer from './Footer'
import Navigation from './Navigation'
// css
import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'
// icons
import courses from '../icons/courses.svg'
import deleteIcon from '../icons/delete.svg'
import viewIcon from '../icons/view.svg'
// data
import classes from '../data/classes.json'
import subjects from '../data/subjects.json'
import terms from '../data/terms.json'
import weeks from '../data/weeks.json'

function Terms() {
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

    const deletePost = postId => {
        fetch(`https://firstclassbrain-server.herokuapp.com/delete-post/${postId}`, {
            method: "delete",
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            alert("Delete successfully. Reload page to continue")
            // const newData = data.filter(item => {
            //     return item._id !== result._id
            // })
            // setData(newData)
        })
    }

    const [data, setData] = useState([])
    
    return (
        <div className="dashboard">
            <div className="main-content">
                <Navigation page="courses" image={courses} />

                <section className="top-button">
                    <Link className='link' to='/add-course'>
                        <button>+ Add Course</button>
                    </Link>
                </section>
                
                <div className="table courses-table">
                    <div className="filter-columns courses-filter-columns">
                        <div className="tab">
                            <select className="sub-title">
                                <option value="all-class" selected>
                                    all classes
                                </option>
                                {
                                    classes.map(item => {
                                        return(
                                            <option value={item.class}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        
                        <div className="tab">
                            <select className="sub-title">
                                <option value="all-class" selected>
                                    all subjects
                                </option>
                                {
                                    subjects.map(item => {
                                        return(
                                            <option value={item.subject}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        
                        <div className="tab">
                            <select className="sub-title">
                                <option value="all-class" selected>
                                    all terms
                                </option>
                                {
                                    terms.map(item => {
                                        return(
                                            <option value={item.term}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        
                        <div className="tab">
                            <select className="sub-title">
                                <option value="all-class" selected>
                                    all weeks
                                </option>
                                {
                                    weeks.map(item => {
                                        return(
                                            <option value={item.week}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        
                        <div className="tab">
                            <div className="search">
                                <input type="text" placeholder="Search..." />
                            </div>
                        </div>
                    </div>
                
                    <div className="heading columns">
                        <div className="tab">Material</div>
                        <div className="tab">Class</div>
                        <div className="tab">Term</div>
                        <div className="tab">Week</div>
                        <div className="tab">Subject</div>
                    </div>
                    
                    {
                        data.map(item => {
                            let compsClass = ""
                            let compsTerm = ""
                            let compsWeek = ""

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

                            switch(`${item.term}`){
                                case `1`: compsTerm = "1st Term";
                                break;
                                case `2`: compsTerm = "2nd Term";
                                break;
                                case `3`: compsTerm = "3rd Term";
                                break;
                                default: compsTerm = "Term"
                            }

                            switch(`${item.week}`){
                                case `1`: compsWeek = "Week 1";
                                break;
                                case `2`: compsWeek = "Week 2";
                                break;
                                case `3`: compsWeek = "Week 3";
                                break;
                                case `4`: compsWeek = "Week 4";
                                break;
                                case `5`: compsWeek = "Week 5";
                                break;
                                case `6`: compsWeek = "Week 6";
                                break;
                                case `7`: compsWeek = "Week 7";
                                break;
                                case `8`: compsWeek = "Week 8";
                                break;
                                case `9`: compsWeek = "Week 9";
                                break;
                                case `10`: compsWeek = "Week 10";
                                break;
                                case `11`: compsWeek = "Week 11";
                                break;
                                case `12`: compsWeek = "Week 12";
                                break;
                                case `13`: compsWeek = "Week 13";
                                break;
                                case `14`: compsWeek = "Week 14";
                                break;
                                default: compsWeek = "Week"
                            }

                            return(
                                
                                <div className="columns">
                                    <div className="tab">{item.courseTitle}</div>
                                    <div className="tab">{compsClass}</div>
                                    <div className="tab">{compsTerm}</div>
                                    <div className="tab">{compsWeek}</div>
                                    <div className="tab">{item.subject}</div>
                                    <div className="tab button">
                                        <Link className="link" to={'/course-details/' + item._id}>
                                            <img 
                                                className="columns-icon mobile-head" 
                                                src={viewIcon} 
                                                alt="view" 
                                            />
                                        </Link>
                                    </div>
                                    <div className="tab button">
                                        <img 
                                            className="columns-icon mobile-head" 
                                            src={deleteIcon} 
                                            alt="delete" 
                                            onClick={() => deletePost(item._id)}
                                        />
                                    </div>
                                </div>
                
                            )
                        })
                    }
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Terms
