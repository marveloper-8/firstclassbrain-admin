import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'

import Footer from './Footer'
import SideNav from './SideNav'
import Navigation from './Navigation'

import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'

import tests_icon from '../icons/tests.svg'

function Terms() {
    const {testId} = useParams()
    console.log(testId)

    const [testDetails, setTestDetails] = useState([])
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
                // console.log(result.test.questions)
                // setTestDetails(result.test.questions)
                setTestDetails(result)
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

    const questions_list = `${testDetails.test ? testDetails.test.topic : "loading"}`

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
                        questionsList.map(item => {
                            return (
                                <div className={questions_list === item.topic ? "item-container" : "disappear"}>
                                    {
                                        item.questions.map(questionsItem => {
                                            return (
                                                <div className="item">
                                                    <div className="number">
                                                        Question 
                                                    </div>
                                                    <div className="question">
                                                        {questionsItem.question}
                                                    </div>
                                                    <div className="answer-options">
                                                        <div className="tab">
                                                            <div className="select desktop">A</div>
                                                            <div className="label">
                                                                {questionsItem.answerA}
                                                            </div>
                                                        </div>
                                                        <div className="tab correct-answer">
                                                            <div className="select desktop">B</div>
                                                            <div className="label">
                                                                {questionsItem.answerB}
                                                            </div>
                                                        </div>
                                                        <div className="tab">
                                                            <div className="select desktop">C</div>
                                                            <div className="label">
                                                                {questionsItem.answerC}
                                                            </div>
                                                        </div>
                                                        <div className="tab">
                                                            <div className="select desktop">D</div>
                                                            <div className="label">
                                                                {questionsItem.answerD}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="correction">
                                                        <div className="number">Correction</div>
                                                        <div className="answer">
                                                            {questionsItem.correction}
                                                        </div>
                                                        <div className='media'
                                                            style={{
                                                                backgroundImage: `url(${questionsItem.correctionImage})`,
                                                                backgroundSize:`cover`,
                                                                backgroundPosition:`center`
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
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
