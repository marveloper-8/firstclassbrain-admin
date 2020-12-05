import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

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
import e from 'cors'

function Terms() {
    const history = useHistory()

    
    const [image, setImage] = useState()
    const [preview, setPreview] = useState()
    
    const [imageTwo, setImageTwo] = useState()
    const [previewTwo, setPreviewTwo] = useState()
    
    const [imageThree, setImageThree] = useState()
    const [previewThree, setPreviewThree] = useState()
    
    const [imageFour, setImageFour] = useState()
    const [previewFour, setPreviewFour] = useState()
    
    const [imageFive, setImageFive] = useState()
    const [previewFive, setPreviewFive] = useState()
    
    const [video, setVideo] = useState()
    const [videoPreview, setVideoPreview] = useState()



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

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!imageTwo) {
            setPreviewTwo(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(imageTwo)
        setPreviewTwo(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [imageTwo])

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!imageThree) {
            setPreviewThree(undefined)
            return
        }

        const objectUrlThree = URL.createObjectURL(imageThree)
        setPreviewThree(objectUrlThree)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrlThree)
    }, [imageThree])

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!imageFour) {
            setPreviewFour(undefined)
            return
        }

        const objectUrlFour = URL.createObjectURL(imageFour)
        setPreviewFour(objectUrlFour)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrlFour)
    }, [imageFour])

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!imageFive) {
            setPreviewFive(undefined)
            return
        }

        const objectUrlFive = URL.createObjectURL(imageFive)
        setPreviewFive(objectUrlFive)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrlFive)
    }, [imageFive])

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!video) {
            setVideoPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(video)
        setVideoPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [video])



    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setImage(e.target.files[0])
    }
    const onSelectFileTwo = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setImageTwo(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setImageTwo(e.target.files[0])
    }
    const onSelectFileThree = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setImageThree(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setImageThree(e.target.files[0])
    }
    const onSelectFileFour = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setImageFour(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setImageFour(e.target.files[0])
    }
    const onSelectFileFive = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setImageFive(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setImageFive(e.target.files[0])
    }
    const onSelectFileVideo = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setVideo(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setVideo(e.target.files[0])
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
    const [urlTwo, setUrlTwo] = useState(undefined)
    const [urlThree, setUrlThree] = useState(undefined)
    const [urlFour] = useState(undefined)
    const [urlFive] = useState(undefined)
    const [urlVideo, setUrlVideo] = useState(undefined)
    
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    })
    useEffect(()=>{
        if(urlTwo){
            uploadFields()
        }
    })
    useEffect(()=>{
        if(urlThree){
            uploadFields()
        }
    })
    useEffect(()=>{
        if(urlFour){
            uploadFields()
        }
    })
    useEffect(()=>{
        if(urlFive){
            uploadFields()
        }
    })
    useEffect(()=>{
        if(urlVideo){
            uploadFields()
        }
    })
    
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
    
    const uploadPicTwo = () =>{
        const data = new FormData()
        data.append("file", imageTwo)
        data.append("upload_preset","ao-estate")
        data.append("cloud_name","josh-equere")
        fetch("https://api.cloudinary.com/v1_1/josh-equere/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrlTwo(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const uploadMedia = () => {
        uploadPic()
        uploadPicTwo()
    }
    
    const uploadVideo = e =>{
        const data = new FormData()
        data.append("file",video)
        data.append("upload_preset","ao-estate")
        data.append("cloud_name","josh-equere")
        fetch("https://api.cloudinary.com/v1_1/josh-equere/video/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrlVideo(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const uploadFields = () => {
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
                video: urlVideo,
                courseTitle,
                firstTextSlide,
                secondTextSlide,
                thirdTextSlide,
                fourthTextSlide,
                courseThumbnail: url,
                firstImageSlide: urlTwo,
                secondImageSlide: urlTwo,
                thirdImageSlide: url,
                fourthImageSlide: urlTwo
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
    const PostSignup = e =>{
        e.preventDefault()
        if(video){
            uploadVideo()
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

                        <div className="input input-file">
                            <span>Upload Video</span>
                            <input 
                                type="file" 
                                accept="video/*"
                                placeholder="Link to Video" 
                                onChange={onSelectFileVideo}
                            />
                        </div>

                        {
                            video && <video 
                                width="500" 
                                height="300" 
                                controls 
                                src={videoPreview}
                            >
                                Your browser does not support the HTML5 Video element.
                            </video>
                        }

                        <hr />
                        
                        <div className="input">
                            <textarea
                                placeholder="First Slide's Text" 
                                value={firstTextSlide}
                                onChange={(e) => setFirstTextSlide(e.target.value)}
                                required 
                            ></textarea>
                        </div>

                        <div className="input input-file">
                            <span>First Text Image</span>
                            <input
                                placeholder="Upload Profile Picture" 
                                type="file" 
                                autoComplete="off"
                                onChange={onSelectFileTwo} 
                            />
                        </div>

                        {imageTwo && <img src={previewTwo} alt="profile preview" className="course-thumbnail" />}

                        <hr />
                        
                        <div className="input">
                            <textarea
                                placeholder="Second Slide's Text" 
                                value={secondTextSlide}
                                onChange={(e) => setSecondTextSlide(e.target.value)}
                                required 
                            ></textarea>
                        </div>

                        <div className="input input-file">
                            <span>Second Text Image</span>
                            <input
                                placeholder="Upload Profile Picture" 
                                type="file" 
                                autoComplete="off"
                                onChange={onSelectFileThree} 
                            />
                        </div>

                        {imageThree && <img src={previewThree} alt="profile preview" className="course-thumbnail" />}

                        <hr />
                        
                        <div className="input">
                            <textarea
                                placeholder="Third Slide's Text" 
                                value={thirdTextSlide}
                                onChange={(e) => setThirdTextSlide(e.target.value)}
                                required 
                            ></textarea>
                        </div>

                        <div className="input input-file">
                            <span>Third Text Image</span>
                            <input
                                placeholder="Upload Profile Picture" 
                                type="file" 
                                autoComplete="off"
                                onChange={onSelectFileFour} 
                            />
                        </div>

                        {imageFour && <img src={previewFour} alt="profile preview" className="course-thumbnail" />}

                        <hr />
                        
                        <div className="input">
                            <textarea
                                placeholder="Fourth Slide's Text" 
                                value={fourthTextSlide}
                                onChange={(e) => setFourthTextSlide(e.target.value)}
                                required 
                            ></textarea>
                        </div>

                        <div className="input input-file">
                            <span>Fourth Text Image</span>
                            <input
                                placeholder="Upload Profile Picture" 
                                type="file" 
                                autoComplete="off"
                                onChange={onSelectFileFive} 
                            />
                        </div>

                        {imageFive && <img src={previewFive} alt="profile preview" className="course-thumbnail" />}

                        <div className="input">
                            <button type="submit" className="upload-button">Upload Course</button>
                        </div>
                    </div>
                </form>
        
                <Footer />
            </div>
        </div>
    )
}

export default Terms
