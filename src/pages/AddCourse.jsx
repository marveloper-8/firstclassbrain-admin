import React, {useState, useEffect, useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

import Footer from './Footer'
import Navigation from './Navigation'

import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'

import courses from '../icons/courses.svg'

// data
import classes from '../data/classes.json'
import subjects from '../data/subjects.json'
import terms from '../data/terms.json'
import weeks from '../data/weeks.json'

function Terms() {
    const history = useHistory()

    const [loading, setLoading] = useState(false)
    
    const [image, setImage] = useState()
    const [preview, setPreview] = useState()



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

    // const courseTitle = "Edited"

    const [classSelected, setClassSelected] = useState(1)
    const [subject, setSubject] = useState("maths")
    const [term, setTerm] = useState(1)
    const [week, setWeek] = useState(1)
    const [courseTitle, setCourseTitle] = useState("Course Title")
    const [firstTextSlide, setFirstTextSlide] = useState("First Paragraph")
    const [secondTextSlide, setSecondTextSlide] = useState("Second Paragraph")
    const [thirdTextSlide, setThirdTextSlide] = useState("Third Paragraph")
    const [fourthTextSlide, setFourthTextSlide] = useState("Fourth Paragraph")

    const [url, setUrl] = useState(undefined)
    
    const uploadPic = () =>{
        const data = new FormData()
        data.append("file", image)
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

    const uploadFields = useCallback(() => {
        setLoading(true)
        fetch("https://firstclassbrain-server.herokuapp.com/upload-course", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                classSelected,
                subject,
                term,
                week,
                courseTitle,
                firstTextSlide,
                secondTextSlide,
                thirdTextSlide,
                fourthTextSlide,
                courseThumbnail: url
            })
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                    setLoading(false)
                }
                else{
                    M.toast({html: "Uploaded successfully", classes:"#c62828 teal darken-3"})
                    history.push('/courses')
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    })
    
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    }, [url, uploadFields])
    
    const PostSignup = e =>{
        e.preventDefault()
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }
    // end of signup
    
    return (
        <div className="dashboard">
            <div className="main-content">
                <Navigation page="courses" image={courses} />
                <form className="table courses-table" onSubmit={PostSignup}>
                    <div className="filter-columns add-courses-filter-columns">
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
                    </div>
                
                    <div className="form">
                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="Course Title" 
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="input input-file">
                            <span>Upload Course Thumbnail</span>
                            <input
                                placeholder="Upload Profile Picture" 
                                type="file" 
                                autoComplete="off"
                                onChange={onSelectFile} 
                            />
                        </div>

                        {image && <img src={preview} alt="profile preview" className="course-thumbnail" />}

                        <hr />
                        
                        <div className="input">
                            <textarea
                                placeholder="First Slide's Text" 
                                value={firstTextSlide}
                                onChange={(e) => setFirstTextSlide(e.target.value)}
                                required 
                            ></textarea>
                        </div>

                        <hr />
                        
                        <div className="input">
                            <textarea
                                placeholder="Second Slide's Text" 
                                value={secondTextSlide}
                                onChange={(e) => setSecondTextSlide(e.target.value)}
                                required 
                            ></textarea>
                        </div>

                        <hr />
                        
                        <div className="input">
                            <textarea
                                placeholder="Third Slide's Text" 
                                value={thirdTextSlide}
                                onChange={(e) => setThirdTextSlide(e.target.value)}
                                required 
                            ></textarea>
                        </div>

                        <hr />
                        
                        <div className="input">
                            <textarea
                                placeholder="Fourth Slide's Text" 
                                value={fourthTextSlide}
                                onChange={(e) => setFourthTextSlide(e.target.value)}
                                required 
                            ></textarea>
                        </div>

                        <div className="input">
                            <button 
                                type="submit"
                                className="btn waves-effect waves-light #64b5f6 teal darken-1 upload-button"
                            >
                                {
                                    loading
                                    ?
                                    <i class="fa fa-spinner fa-spin"></i>
                                    :
                                    "UPLOAD MATERIAL"
                                }
                            </button>
                        </div>
                    </div>
                </form>
        
                <Footer />
            </div>
        </div>
    )
}

export default Terms
