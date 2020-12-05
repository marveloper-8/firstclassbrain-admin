import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'

// components
import Footer from './Footer'
import SideNav from './SideNav'
import Navigation from './Navigation'

// css
import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'

// svg
import tests from '../icons/tests.svg'

// data
import classes from '../data/classes.json'
import subjects from '../data/subjects.json'
import terms from '../data/terms.json'
import weeks from '../data/weeks.json'
import tests_data from '../data/tests.json'

function Terms() {
    const history = useHistory()
    const {userId} = useParams()

    const [data, setData] = useState([])

    console.log(userId)
    
    const [image] = useState()
    const [preview, setPreview] = useState()

    useEffect(()=>{
        fetch('/all-courses', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setData(result.posts)
            })
    },[])
    
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!image) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])
    
    // const onSelectFile = e => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setImage(undefined)
    //         return
    //     }

    //     // I've kept this example simple by using the first image instead of multiple
    //     setImage(e.target.files[0])
    // }

    const [type, setType] = useState("")
    const [classSelected, setClassSelected] = useState("")
    const [subject, setSubject] = useState("")
    const [term, setTerm] = useState("")
    const [week, setWeek] = useState("")
    const [topic, setTopic] = useState("")
    // const [questions, setQuestions] = useState({...questionsContainer})


    // const questionsContainer = ([
    //     [id, setId] = useState("")
    //     [question, setQuestion] = useState("")
    //     [answerA, setAnswerA] = useState("")
    //     [answerB, setAnswerB] = useState("")
    //     [answerC, setAnswerC] = useState("")
    //     [answerD, setAnswerD] = useState("")
    //     [correctAnswer, setCorrectAnswer] = useState("")
    // ])
   

    const [url, setUrl] = useState("")
    
    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","ao-estate")
        data.append("cloud_name","josh-equere")
        fetch("https://api.cloudinary.com/v1_1/josh-equere/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const uploadFields = () => {
        fetch("http://localhost:5000/upload-test", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type,
                classSelected,
                subject,
                term,
                week,
                topic,
                // questions,
                correctionImage: url
            })
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    alert(data.error)
                }
                else{
                    alert("Uploaded Successfully")
                    history.push('/courses')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const PostTest = () =>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }
    
    return (
        <div className="dashboard">
            <SideNav page="tests" />
            <div className="main-content">
                <Navigation page="tests" image={tests} />

                <div className="table add-test-table">
                    <div className="filter-columns add-test-filter-columns">
                        <div className="tab">
                            <select 
                                className="sub-title"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                {
                                    tests_data.map(item => {
                                        return(
                                            <option value={item.test} selected>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="tab">
                            <select 
                                className="sub-title"
                                value={classSelected}
                                onChange={(e) => setClassSelected(e.target.value)}
                                required
                            >
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
                            <select 
                                className="sub-title"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            >
                                {
                                    subjects.map(item => {
                                        return(
                                            <option value={item.subject} selected>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        
                        <div className="tab">
                            <select 
                                className="sub-title"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                required
                            >
                                {
                                    terms.map(item => {
                                        return(
                                            <option value={item.term} selected>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        
                        <div className="tab">
                            <select 
                                className="sub-title"
                                value={week}
                                onChange={(e) => setWeek(e.target.value)}
                                required
                            >
                                {
                                    weeks.map(item => {
                                        return(
                                            <option value={item.week} selected>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        
                        <div className="tab">
                            <select 
                                className="sub-title"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                required
                            >
                                {
                                    data.map(item => {
                                        return(
                                            <option value={item._id} selected>{item.courseTitle}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    
                    <div className="item">
                        <div className="number">Question 1</div>
                        <div className="question">
                            <textarea placeholder="Type Question Here"></textarea>
                        </div>
                        <div className="answer-options">
                            <div className="tab">
                                <div className="select selected">
                                    Option A
                                </div>
                                <div></div>
                                <div className="label">
                                    <input type="text" placeholder="Option A Answer" />
                                </div>
                            </div>
                            <div className="tab">
                                <div className="select">
                                    Option B
                                </div>
                                <div></div>
                                <div className="label">
                                    <input type="text" placeholder="Option B Answer" />
                                </div>
                            </div>
                            <div className="tab">
                                <div className="select">
                                    Option C
                                </div>
                                <div></div>
                                <div className="label">
                                    <input type="text" placeholder="Option C Answer" />
                                </div>
                            </div>
                            <div className="tab">
                                <div className="select">
                                    Option D
                                </div>
                                <div></div>
                                <div className="label">
                                    <input type="text" placeholder="Option D Answer" />
                                </div>
                            </div>
                        </div>
                        <div className="correction">
                            <div className="number">Correction</div>
                            <textarea placeholder="Correction goes here"></textarea>
                            <div className="input-file">
                                <span>Upload Media</span>
                                <input type="file" />
                            </div>
                        </div>

                        {image && <img src={preview} alt="profile preview" className="course-thumbnail" />}
                    </div>

                    
                    <div className="item">
                        <div className="number">Question 2</div>
                        <div className="question">
                            <textarea placeholder="Type Question Here"></textarea>
                        </div>
                        <div className="answer-options">
                            <div className="tab">
                                <div className="select">
                                    Option A
                                </div>
                                <div></div>
                                <div className="label">
                                    <input type="text" placeholder="Option A Answer" />
                                </div>
                            </div>
                            <div className="tab">
                                <div className="select">
                                    Option B
                                </div>
                                <div></div>
                                <div className="label">
                                    <input type="text" placeholder="Option B Answer" />
                                </div>
                            </div>
                            <div className="tab">
                                <div className="select selected">
                                    Option C
                                </div>
                                <div></div>
                                <div className="label">
                                    <input type="text" placeholder="Option C Answer" />
                                </div>
                            </div>
                            <div className="tab">
                                <div className="select">
                                    Option D
                                </div>
                                <div></div>
                                <div className="label">
                                    <input type="text" placeholder="Option D Answer" />
                                </div>
                            </div>
                        </div>
                        <div className="correction">
                            <div className="number">Correction</div>
                            <textarea placeholder="Correction goes here"></textarea>
                            <div className="input-file">
                                <span>Upload Media</span>
                                <input type="file" />
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <button onClick={() => PostTest()} className="add-test-button">Upload Test Question</button>
                    </div>
                    
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Terms
