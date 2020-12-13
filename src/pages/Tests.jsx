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
import tests_icon from '../icons/tests.svg'
import deleteIcon from '../icons/delete.svg'
import viewIcon from '../icons/view.svg'
// data
import classes from '../data/classes.json'
import subjects from '../data/subjects.json'
import terms from '../data/terms.json'
import weeks from '../data/weeks.json'
import tests from '../data/tests.json'

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

    useEffect(()=>{
        fetch('https://firstclassbrain-server.herokuapp.com/all-courses', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setTopics(result.posts)
            })
    },[])

    useEffect(()=>{
        fetch('https://firstclassbrain-server.herokuapp.com/all-tests', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setData(result.tests)
            })
    },[])

    const deletePost = testId => {
        fetch(`https://firstclassbrain-server.herokuapp.com/delete-test/${testId}`, {
            method: "delete",
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            toast.dark("Delete successful")
            history.push('/tests')
        })
    }
    
    const [data, setData] = useState([])
    const [topics, setTopics] = useState([])

    return (
        <div className="dashboard">
            <div className="main-content">
                <Navigation page="tests" image={tests_icon} />

                <section className="top-button">
                    <Link className='link' to='/add-test'>
                        <button>+ Add Test</button>
                    </Link>
                </section>
                
                <div className="table-tests">
                    <div className="filter-columns tests-filter-columns">
                        <div className="tab">
                            <select className="sub-title">
                                <option value="all-class" selected>
                                    all test types
                                </option>
                                {
                                    tests.map(item => {
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
                        <div className="tab">Type</div>
                        <div className="tab">Subject</div>
                    </div>
                    
                    
                    {
                        data.map(item => {
                            let compsClass = ""
                            let compsTerm = ""
                            let compsWeek = ""
                            let compsType = ""

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

                            switch(`${item.type}`){
                                case `1`: compsType = "Assignment";
                                break;
                                case `2`: compsType = "Weekly Assesment";
                                break;
                                case `3`: compsType = "Mid Term Test";
                                break;
                                case `4`: compsType = "Examination";
                                break;
                                default: compsType = "Term"
                            }

                            return(
                                <>
                                      
                                    <Link className="link mobile" to={'/test-questions/' + item._id}>  
                                    <div className="columns">
                                        <div className="tab">{item.title}</div>
                                        <div className="tab">{compsClass}</div>
                                        <div className="tab">{compsTerm}</div>
                                        <div className="tab">{compsWeek}</div>
                                        <div className="tab">
                                            {compsType}
                                        </div>
                                        <div className="tab">{item.subject}</div>
                                    </div>
                                    </Link>
                                    
                                    <div className="columns desktop">
                                        <div className="tab">{item.title}</div>
                                        <div className="tab">{compsClass}</div>
                                        <div className="tab">{compsTerm}</div>
                                        <div className="tab">{compsWeek}</div>
                                        <div className="tab">
                                            {compsType}
                                        </div>
                                        <div className="tab">{item.subject}</div>
                                        <div className="tab button desktop">
                                            <Link className="link" to={'/test-questions/' + item._id}>
                                                <img 
                                                    className="columns-icon mobile-head" 
                                                    src={viewIcon} 
                                                    alt="view" 
                                                />
                                            </Link>
                                            
                                        </div>
                                        <div className="tab button desktop">
                                            <img 
                                                className="columns-icon mobile-head" 
                                                src={deleteIcon} 
                                                alt="delete" 
                                                onClick={() => deletePost(item._id)}
                                            />
                                        </div>
                                    </div>
                    
                                </>
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
