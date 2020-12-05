import React, {useState, useEffect, useCallback} from 'react'
import {useHistory, useParams} from 'react-router-dom'

// components
import Footer from './Footer'
import Navigation from './Navigation'

// css
import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'

// svg
import tests_icon from '../icons/tests.svg'

// data
import subjects from '../data/subjects.json'

function Terms() {
    const history = useHistory()
    const {userId} = useParams()

    const [url, setUrl] = useState(undefined)
    const [image, setImage] = useState()
    const [preview, setPreview] = useState()

    const [courses, setCourses] = useState([])

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

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setImage(e.target.files[0])
    }

    console.log(userId)

    const [state, setState] = useState({
        type: 1,
        classSelected: 1,
        subject: "maths",
        term: 1,
        week: 1,
        hours: {},
        minutes:{},
        topic: "topic",
        questions: [
            {   id: 1,
                question: "question", 
                answerA: "Answer A", 
                answerB: "Answer B", 
                answerC: "Answer C", 
                answerD: "Answer D", 
                correctAnswer: "correct answer", 
                correction: "correction", 
                correctionImage: url,
                // preview: ``
            }
        ]
    })

    const testType = `${state.type}`
    
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

    const handleSubmit = useCallback((evt) => {
        evt.preventDefault()

        const { type, classSelected, subject, term, week, hours, minutes, topic, questions } = state

        const data = { type, classSelected, subject, term, week, hours, minutes, topic, questions }

        fetch('https://firstclassbrain-server.herokuapp.com/upload-test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })
    
    useEffect(()=>{
        if(url){
            handleSubmit()
        }
    }, [url, handleSubmit])
    
    const PostTest = (e) =>{
        e.preventDefault()
        if(image){
            uploadPic()
        }else{
            handleSubmit()
        }
    }

    const handleAddShareholder = () => {
        setState({...state, questions: state.questions.concat([{ id: state.questions.length + 1 }]) });
    }

    const handleRemoveShareholder = (idx) => () => {
        setState({...state, questions: state.questions.filter((s, qidx) => idx !== qidx) });
    }
  
    const onChangeEvent = (event) => {
        setState({...state, [event.target.name]: event.target.value })
    }

    const handleShareholderQuestionChange = (idx) => (evt) => {
        const newQuestions = state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, question: evt.target.value };
        });
        
        setState({...state, questions: newQuestions });
    }

    const handleShareholderAnsweraChange = (idx) => (evt) => {
        const newQuestions = state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, answerA: evt.target.value };
        });
        
        setState({...state, questions: newQuestions });
    }

    const handleShareholderAnswerbChange = (idx) => (evt) => {
        const newQuestions = state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, answerB: evt.target.value };
        });
        
        setState({...state, questions: newQuestions });
    }

    const handleShareholderAnswercChange = (idx) => (evt) => {
        const newQuestions = state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, answerC: evt.target.value };
        });
        
        setState({...state, questions: newQuestions });
    }

    const handleShareholderAnswerdChange = (idx) => (evt) => {
        const newQuestions = state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, answerD: evt.target.value };
        });
        
        setState({...state, questions: newQuestions });
    }

    const handleShareholderCorrectAnswerChange = (idx) => (evt) => {
        const newQuestions = state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, correctAnswer: evt.target.value };
        });
        
        setState({...state, questions: newQuestions });
    }

    const handleShareholderCorrectionChange = (idx) => (evt) => {
        const newQuestions = state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, correction: evt.target.value };
        });
        
        setState({...state, questions: newQuestions });
    }

    const handleShareholderCorrectionImageChange = (idx) => (evt) => {
        evt.preventDefault()
        const newQuestions = state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, correctionImage: evt.target.value };
        });
        
        setState({...state, questions: newQuestions });
    }
    
    return (
        <div className="dashboard">
            <div className="main-content">
                <Navigation page="tests" image={tests_icon} />

                <form className="table add-test-table" onSubmit={PostTest}>
                    <div className="filter-columns add-test-filter-columns">
                        <div className="tab">
                            <select name="type"
                                className="sub-title"
                                value={state.type}
                                onChange={onChangeEvent}
                            >
                                <option value={1} selected>
                                    Assignment
                                </option>
                                <option value={2}>
                                    Weekly Assessment
                                </option>
                                <option value={3}>
                                    Mid Term Test
                                </option>
                                <option value={4}>
                                    Examination
                                </option>
                            </select>
                        </div>

                        <div className="tab">
                            <select name="classSelected"
                                className="sub-title"
                                value={state.classSelected}
                                onChange={onChangeEvent}
                                required
                            >
                                <option value={1} selected>
                                    Basic 1
                                </option>
                                <option value={2}>
                                    Basic 2
                                </option>
                                <option value={3}>
                                    Basic 3
                                </option>
                                <option value={4}>
                                    Basic 4
                                </option>
                                <option value={5}>
                                    Basic 5
                                </option>
                                <option value={6}>
                                    JSS 1
                                </option>
                                <option value={7}>
                                    JSS 2
                                </option>
                                <option value={8}>
                                    JSS 3
                                </option>
                                <option value={9}>
                                    SSS 1 (Sci)
                                </option>
                                <option value={10}>
                                    SSS 1 (Comm)
                                </option>
                                <option value={11}>
                                    SSS 1 (Art)
                                </option>
                                <option value={12}>
                                    SSS 2 (Sci)
                                </option>
                                <option value={13}>
                                    SSS 2 (Comm)
                                </option>
                                <option value={14}>
                                    SSS 2 (Art)
                                </option>
                                <option value={15}>
                                    SSS 3 (Sci)
                                </option>
                                <option value={16}>
                                    SSS 3 (Comm)
                                </option>
                                <option value={17}>
                                    SSS 3 (Art)
                                </option>
                            </select>
                        </div>
                        
                        <div className="tab">
                            <select name="subject"
                                className="sub-title"
                                value={state.subject}
                                onChange={onChangeEvent}
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
                            <select name="term"
                                className="sub-title"
                                value={state.term}
                                onChange={onChangeEvent}
                                required
                            >
                                <option value={1} selected>
                                    1st Term
                                </option>
                                <option value={2}>
                                    2nd Term
                                </option>
                                <option value={3}>
                                    3rd Term
                                </option>
                            </select>
                        </div>
                        
                        <div className="tab">
                            <select name="week"
                                className="sub-title"
                                value={state.week}
                                onChange={onChangeEvent}
                                required = {
                                    testType == 3 || testType == 4 
                                    ? 
                                    true
                                    :
                                    false
                                }
                                disabled = {
                                    testType == 3 || testType == 4 
                                    ? 
                                    true
                                    :
                                    false
                                }
                            >
                                <option value={1} selected>
                                    Week 1
                                </option>
                                <option value={2}>
                                    Week 2
                                </option>
                                <option value={3}>
                                    Week 3
                                </option>
                                <option value={4}>
                                    Week 4
                                </option>
                                <option value={5}>
                                    Week 5
                                </option>
                                <option value={6}>
                                    Week 6
                                </option>
                                <option value={7}>
                                    Week 7
                                </option>
                                <option value={8}>
                                    Week 8
                                </option>
                                <option value={9}>
                                    Week 9
                                </option>
                                <option value={10}>
                                    Week 10
                                </option>
                                <option value={11}>
                                    Week 11
                                </option>
                                <option value={12}>
                                    Week 12
                                </option>
                                <option value={13}>
                                    Week 13
                                </option>
                                <option value={14}>
                                    Week 14
                                </option>
                                <option value={15}>
                                    Week 15
                                </option>
                                <option value={16}>
                                    Week 16
                                </option>
                                <option value={17}>
                                    Week 17
                                </option>
                                <option value={18}>
                                    Week 18
                                </option>
                                <option value={19}>
                                    Week 19
                                </option>
                                <option value={20}>
                                    Week 20
                                </option>
                            </select>
                        </div>
                        
                        <div className="tab">
                            <select name="topic"
                                className="sub-title"
                                value={state.topic}
                                onChange={onChangeEvent}
                                required = {
                                    testType == 3 || testType == 4 
                                    ? 
                                    true
                                    :
                                    false
                                }
                                disabled = {
                                    testType == 2 || testType == 3 || testType == 4 
                                    ? 
                                    true
                                    :
                                    false
                                }
                            >
                                {
                                    courses.map(item => {
                                        return(
                                            <option value={item._id} selected>{item.courseTitle}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    
                        <div className="tab">
                            <input name="hours"
                                type="number"
                                placeholder="Input number of hours"
                                className="sub-title"
                                value={state.hours}
                                onChange={onChangeEvent}
                                required
                            />
                        </div>

                        <div className="tab">
                            <input name="minutes"
                                type="number"
                                placeholder="Input number of seconds"
                                className="sub-title"
                                value={state.minutes}
                                onChange={onChangeEvent}
                                required
                            />
                        </div>
                    
                    </div>

                    {state.questions.map((shareholder, idx) => (
                        <div className="item">
                            <div className="number">Question 1</div>
                            <div className="question">
                                <textarea 
                                    key={idx + 1}
                                    value={shareholder.question}
                                    placeholder="Type Question Here"
                                    onChange={handleShareholderQuestionChange(idx)}
                                ></textarea>
                            </div>
                            {shareholder.correctAnswer}
                            <div className="answer-options">
                                <div className="tab">
                                    <div className="select">
                                        <input 
                                            type="radio"
                                            name={idx + 1}
                                            value="answerA"
                                            className="radio"
                                            // value={shareholder.correctAnswer}
                                            onChange={handleShareholderCorrectAnswerChange(idx)}
                                        />
                                        <span className="checkmark"></span>
                                        <span className="text">
                                            <span className="desktop">Option</span> A
                                        </span>
                                    </div>
                                    <div></div>
                                    <div className="label">
                                        <input type="text"
                                            key={idx + 1}
                                            placeholder="Option A Answer" 
                                            value={shareholder.answerA}
                                            onChange={handleShareholderAnsweraChange(idx)}
                                        />
                                    </div>
                                </div>
                                <div className="tab">
                                    <div className="select">
                                        <input 
                                            type="radio"
                                            name={idx + 1}
                                            value="answerB"
                                            className="radio"
                                            // value={shareholder.correctAnswer}
                                            onChange={handleShareholderCorrectAnswerChange(idx)}
                                        />
                                        <span className="checkmark"></span>
                                        <span className="text">
                                            <span className="desktop">Option</span> B
                                        </span>
                                    </div>
                                    <div></div>
                                    <div className="label">
                                        <input type="text" 
                                            key={idx + 1}
                                            placeholder="Option B Answer" 
                                            value={shareholder.answerB}
                                            onChange={handleShareholderAnswerbChange(idx)}
                                        />
                                    </div>
                                </div>
                                <div className="tab">
                                    <div className="select">
                                        <input 
                                            type="radio"
                                            name={idx + 1}
                                            value="answerC"
                                            className="radio"
                                            // value={shareholder.correctAnswer}
                                            onChange={handleShareholderCorrectAnswerChange(idx)}
                                        />
                                        <span className="checkmark"></span>
                                        <span className="text">
                                            <span className="desktop">Option</span> C
                                        </span>
                                    </div>
                                    <div></div>
                                    <div className="label">
                                        <input type="text" 
                                            key={idx + 1}
                                            placeholder="Option C Answer" 
                                            value={shareholder.answerC}
                                            onChange={handleShareholderAnswercChange(idx)}
                                        />
                                    </div>
                                </div>
                                <div className="tab">
                                    <div className="select">
                                        <input 
                                            type="radio"
                                            name={idx + 1}
                                            value="answerD"
                                            className="radio"
                                            // value={shareholder.correctAnswer}
                                            onChange={handleShareholderCorrectAnswerChange(idx)}
                                        />
                                        <span className="checkmark"></span>
                                        <span className="text">
                                            <span className="desktop">Option</span> D
                                        </span>
                                    </div>
                                    <div></div>
                                    <div className="label">
                                        <input type="text" 
                                            key={idx + 1}
                                            placeholder="Option D Answer" 
                                            value={shareholder.answerD}
                                            onChange={handleShareholderAnswerdChange(idx)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="correction">
                                <div className="number">Correction</div>
                                <textarea 
                                    key={idx + 1}
                                    placeholder="Correction goes here"
                                    value={shareholder.correction}
                                    onChange={handleShareholderCorrectionChange(idx)}
                                ></textarea>
                                <div className="input-file">
                                    <span>Upload Media</span>
                                    <input type="file"
                                        key={idx + 1} 
                                        placeholder="image"
                                        value={shareholder.correctionImage}
                                        onChange={handleShareholderCorrectionImageChange(idx)}
                                    />
                                </div>

                                {image && <img src={preview} alt="profile preview" className="course-thumbnail" />}
                            </div>
                            <button 
                                onClick={handleRemoveShareholder(idx)} 
                                className="delete-test-button"
                            >Delete Test Question</button>
                        </div>
                    ))

                    }

                    <button 
                        onClick={handleAddShareholder} 
                        className="add-test-button"
                    >Add Question</button>

                    <div className="upload-test-button-container">
                        <button 
                            className="upload-test-button"
                            type="submit"
                        >Upload Test Question</button>
                    </div>
                    
                </form>

                <Footer />
            </div>
        </div>
    )
}

export default Terms
