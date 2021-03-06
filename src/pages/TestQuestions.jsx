import React, {useState, useEffect, useContext} from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import {UserContext} from '../App'

import Footer from './Footer'
import SideNav from './SideNav'
import Navigation from './Navigation'

import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'

import tests_icon from '../icons/tests.svg'

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

    const {testId} = useParams()
    console.log(testId)

    const [loading, setLoading] = useState(false)
    const [testDetails, setTestDetails] = useState([])
    const [testInfo, setTestInfo] = useState([])
    const [questionsList, setQuestionsList] = useState([])
    const [postList, setPostList] = useState([])

    useEffect(() => {
        fetch(`https://firstclassbrain-server.herokuapp.com/test-details/${testId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setTestDetails(result.test.questions)
            })
    }, [testId])

    useEffect(() => {
        fetch(`https://firstclassbrain-server.herokuapp.com/test-details/${testId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setTestInfo(result.test)
            })
    }, [testId])

    useEffect(()=>{
        fetch('https://firstclassbrain-server.herokuapp.com/all-tests', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setQuestionsList(result.tests)
            })
    },[])

    const deletePost = postId => {
        setLoading(true)
        fetch(`https://firstclassbrain-server.herokuapp.com/delete-test/${postId}`, {
            method: "delete",
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            toast.dark("Delete successful")
            history.push('/tests')
        })
    }

    useEffect(()=>{
        fetch('https://firstclassbrain-server.herokuapp.com/all-courses', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setPostList(result.posts)
            })
    },[])

    let compsClass = ""
    let compsTerm = ""
    let compsWeek = ""
    let compsType = ""

    switch(`${testInfo.classSelected}`){
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

    switch(`${testInfo.term}`){
        case `1`: compsTerm = "1st Term";
        break;
        case `2`: compsTerm = "2nd Term";
        break;
        case `3`: compsTerm = "3rd Term";
        break;
        default: compsTerm = "Term"
    }

    switch(`${testInfo.week}`){
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

    switch(`${testInfo.type}`){
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

    const topic_for_test = `${testInfo ? testInfo.topic : "Please wait..."}`

    console.log(testId)
    
    return (
        <div className="dashboard">
            <div className="main-content">
                <Navigation page="tests" image={tests_icon} />
                
                <div className="test-questions">
                    <section className="head">
                        <Link className='link' to='/add-test'>
                            <button>+ Add Material</button>
                        </Link>
                        <br />
                        <div className="info">
                            <div>
                                <span className="title">{testInfo ? testInfo.title : "Please wait..."}</span> 
                            </div>
                            <div className="extras">
                                <div>{compsClass}</div>
                                <div>{testInfo ? testInfo.subject : "Please wait..."}</div>
                                <div>{compsTerm}</div>
                                <div>{compsWeek}</div>
                                <div>
                                    {compsType}
                                    {
                                        postList.map(item => {
                                            return <span 
                                                className={topic_for_test == item._id || testInfo.type == 1 ? "" : "disappear"}
                                            >
                                                &nbsp; for <b>{item.courseTitle}</b>
                                            </span>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </section>

                    {
                        testDetails ? testDetails.map(item => {
                            return (
                                <div className="item-container">
                                    <div className="item">
                                        <div className="number">
                                            Question 
                                        </div>
                                        <div className="question">
                                            {item.question}
                                        </div>
                                        <div className="answer-options">
                                            <div className={
                                                item.correctAnswer == "answerA"
                                                ?
                                                "tab correct-answer"
                                                :
                                                "tab"
                                            }>
                                                <div className="select desktop">A</div>
                                                <div className="label">
                                                    {item.answerA}
                                                </div>
                                            </div>
                                            
                                            <div className={
                                                item.correctAnswer == "answerB"
                                                ?
                                                "tab correct-answer"
                                                :
                                                "tab"
                                            }>
                                                <div className="select desktop">B</div>
                                                <div className="label">
                                                    {item.answerB}
                                                </div>
                                            </div>

                                            <div className={
                                                item.correctAnswer == "answerC"
                                                ?
                                                "tab correct-answer"
                                                :
                                                "tab"
                                            }>
                                                <div className="select desktop">C</div>
                                                <div className="label">
                                                    {item.answerC}
                                                </div>
                                            </div>

                                            <div className={
                                                item.correctAnswer == "answerD"
                                                ?
                                                "tab correct-answer"
                                                :
                                                "tab"
                                            }>
                                                <div className="select desktop">D</div>
                                                <div className="label">
                                                    {item.answerD}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="correction">
                                            <div className="number">Correction</div>
                                            <div className="answer">
                                                {item.correction}
                                            </div>
                                            <div className='media'
                                                style={{
                                                    backgroundImage: `url(${item.correctionImage})`,
                                                    backgroundSize:`cover`,
                                                    backgroundPosition:`center`
                                                }}
                                            ></div>
                                        </div>
                                        
                                        <Link className="link" to={'/test-image-upload/' + item._id}>
                                            <button>UPLOAD IMAGE FOR THIS QUESTION</button>
                                        </Link>
                                    </div>
                                </div>
                        
                            )
                        }) : "loading..."
                    }

                    <button 
                        onClick={() => deletePost(testId)}
                        className={loading ? "delete-disabled mobile" : "delete mobile"}
                        disabled = {loading ? true : false }
                    >
                        {loading ? "LOADING.." : "DELETE THIS COURSE"}
                    </button>

                </div>

                <Footer />
            </div> 
        </div>
    )
}

export default Terms
