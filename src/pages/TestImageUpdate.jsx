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
    const [questionsList, setQuestionsList] = useState([])
    const [postList, setPostList] = useState([])

    // useEffect(() => {
    //     fetch(`https://firstclassbrain-server.herokuapp.com/test-details/${testId}`, {
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("jwt")
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(result => {
    //             console.log(result)
    //             setTestDetails(result.test.questions)
    //         })
    // }, [testId])

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
