import React, {useState, useEffect, useCallback} from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

import Footer from './Footer'
import Navigation from './Navigation'

import './css/general.css'
import './css/dashboard.css'
import './css/navigation.css'

import courses from '../icons/courses.svg'
import pdf from '../icons/pdf.svg'

function Terms() {
    const {postId} = useParams()
    console.log(postId)

    const [postDetails, setPostDetails] = useState([])

    useEffect(() => {
        fetch(`https://firstclassbrain-server.herokuapp.com/course-details/${postId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setPostDetails(result)
            })
    }, [postId])

    const history = useHistory()
    const [loading, setLoading] = useState(false)
    // const [loading, setLoading] = useState(false)
    
    const [image, setImage] = useState()
    const [preview, setPreview] = useState()
    
    const [imageTwo, setImageTwo] = useState()
    const [previewTwo, setPreviewTwo] = useState()
    
    const [imageThree, setImageThree] = useState()
    const [previewThree, setPreviewThree] = useState()
    
    const [imageFour, setImageFour] = useState()
    const [previewFour, setPreviewFour] = useState()
    
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

        const objectUrl = URL.createObjectURL(imageThree)
        setPreviewThree(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [imageThree])

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!imageFour) {
            setPreviewFour(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(imageFour)
        setPreviewFour(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [imageFour])

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
    const onSelectFileVideo = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setVideo(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setVideo(e.target.files[0])
    }

    const [url, setUrl] = useState(undefined)
    const [urlTwo, setUrlTwo] = useState(undefined)
    const [urlThree, setUrlThree] = useState(undefined)
    const [urlFour, setUrlFour] = useState(undefined)
    const [urlVideo, setUrlVideo] = useState(undefined)
    

    // first image upload
    const uploadFirstImage = e =>{
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

    const firstImageUpload = useCallback(() => {
        setLoading(true)
        fetch(`https://firstclassbrain-server.herokuapp.com/update-first-image/${postDetails.post ? postDetails.post._id : "loading"}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstImageSlide: url})
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                    setLoading(false)
                }
                else{
                    M.toast({html: "Updated first image successfully! Reload to continue.", classes:"#c62828 teal darken-3"})
                    history.push(`/course-details/${postDetails.post ? postDetails.post._id : "loading"}`)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    })
    
    useEffect(()=>{
        if(url){
            firstImageUpload()
        }
    }, [url])

    const ReplaceFirstImage = e =>{
        if(image){
            uploadFirstImage()
        }else{
            firstImageUpload()
        }
    }
    // end of first image upload
    

    // second image upload
    const uploadSecondImage = e =>{
        const data = new FormData()
        data.append("file",imageTwo)
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

    const secondImageUpload = useCallback(() => {
        setLoading(true)
        fetch(`https://firstclassbrain-server.herokuapp.com/update-second-image/${postDetails.post ? postDetails.post._id : "loading"}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({secondImageSlide: urlTwo})
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                    setLoading(false)
                }
                else{
                    M.toast({html: "Updated second image successfully! Reload to continue.", classes:"#c62828 teal darken-3"})
                    history.push(`/course-details/${postDetails.post ? postDetails.post._id : "loading"}`)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    })
    
    useEffect(()=>{
        if(urlTwo){
            secondImageUpload()
        }
    }, [urlTwo])

    const ReplaceSecondImage = e =>{
        if(imageTwo){
            uploadSecondImage()
        }else{
            secondImageUpload()
        }
    }
    // end of second image upload
    

    // third image upload
    const uploadThirdImage = e =>{
        const data = new FormData()
        data.append("file",imageThree)
        data.append("upload_preset","ao-estate")
        data.append("cloud_name","josh-equere")
        fetch("https://api.cloudinary.com/v1_1/josh-equere/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrlThree(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const thirdImageUpload = useCallback(() => {
        setLoading(true)
        fetch(`https://firstclassbrain-server.herokuapp.com/update-third-image/${postDetails.post ? postDetails.post._id : "loading"}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({thirdImageSlide: urlThree})
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                    setLoading(false)
                }
                else{
                    M.toast({html: "Updated third image successfully! Reload to continue.", classes:"#c62828 teal darken-3"})
                    history.push(`/course-details/${postDetails.post ? postDetails.post._id : "loading"}`)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    })
    
    useEffect(()=>{
        if(urlThree){
            thirdImageUpload()
        }
    }, [urlThree])

    const ReplaceThirdImage = e =>{
        if(imageThree){
            uploadThirdImage()
        }else{
            thirdImageUpload()
        }
    }
    // end of third image upload
    

    // fourth image upload
    const uploadFourthImage = e =>{
        const data = new FormData()
        data.append("file",imageFour)
        data.append("upload_preset","ao-estate")
        data.append("cloud_name","josh-equere")
        fetch("https://api.cloudinary.com/v1_1/josh-equere/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrlFour(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const fourthImageUpload = useCallback(() => {
        setLoading(true)
        fetch(`https://firstclassbrain-server.herokuapp.com/update-fourth-image/${postDetails.post ? postDetails.post._id : "loading"}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({fourthImageSlide: urlFour})
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                    setLoading(false)
                }
                else{
                    M.toast({html: "Updated fourth image successfully! Reload to continue.", classes:"#c62828 teal darken-3"})
                    history.push(`/course-details/${postDetails.post ? postDetails.post._id : "loading"}`)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    })
    
    useEffect(()=>{
        if(urlFour){
            fourthImageUpload()
        }
    }, [urlFour])

    const ReplaceFourthImage = e =>{
        if(imageFour){
            uploadFourthImage()
        }else{
            fourthImageUpload()
        }
    }
    // end of fourth image upload
    

    // video upload
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

    const videoUpload = useCallback(() => {
        setLoading(true)
        fetch(`https://firstclassbrain-server.herokuapp.com/update-video/${postDetails.post ? postDetails.post._id : "loading"}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({video: urlVideo})
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"})
                    setLoading(false)
                }
                else{
                    M.toast({html: "Updated video successfully! Reload to continue.", classes:"#c62828 teal darken-3"})
                    history.push(`/course-details/${postDetails.post ? postDetails.post._id : "loading"}`)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    })
    
    useEffect(()=>{
        if(urlVideo){
            videoUpload()
        }
    }, [urlVideo])

    const ReplaceVideo = e =>{
        if(video){
            uploadVideo()
        }else{
            videoUpload()
        }
    }
    // end of video upload
    
    return (
        <div className="dashboard">
            <div className="main-content">
                <Navigation page="courses" image={courses} />
                
                <div className="course-details-content">
                    <div className="course-thumbnail"
                        style={{
                            backgroundImage: `url(${postDetails.post ? postDetails.post.courseThumbnail : "loading"})`,
                            backgroundSize:`cover`,
                            backgroundPosition:`center`
                        }}
                    ></div>
                    <section className="head">
                        <div className="title">
                            {postDetails.post ? postDetails.post.courseTitle : "loading"}
                        </div>

                        <div className="button-container">
                            <Link className='link' to='/add-course'>
                                <button>+ Add Material</button>
                            </Link>
                        </div>
                    </section>

                    <iframe className="video" title="video"
                    src={postDetails.post ? postDetails.post.video : "loading"}
                    ></iframe>

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

                    <div className="input">
                        <button 
                            onClick={ReplaceVideo}
                            className="btn waves-effect waves-light #64b5f6 teal darken-1 upload-button"
                        >
                            {
                                loading
                                ?
                                <i class="fa fa-spinner fa-spin"></i>
                                :
                                "UPDATE VIDEO"
                            }
                        </button>
                    </div>

                    <div className="text-picture-container">
                        <div className="tab">
                            <div className="image"
                                style={{
                                    backgroundImage: `url(${postDetails.post ? postDetails.post.firstImageSlide : "loading"})`,
                                    backgroundSize:`cover`,
                                    backgroundPosition:`center`
                                }}
                            ></div>

                            <div className="input input-file">
                                <span>Upload First Image</span>
                                <input
                                    placeholder="Upload Profile Picture" 
                                    type="file" 
                                    autoComplete="off"
                                    onChange={onSelectFile} 
                                />
                            </div>
    
                            {image && <img src={preview} alt="profile preview" className="course-thumbnail-preview" />}

                            <div className="input">
                                <button 
                                    onClick={ReplaceFirstImage}
                                    className="btn waves-effect waves-light #64b5f6 teal darken-1 upload-button"
                                >
                                    {
                                        loading
                                        ?
                                        <i class="fa fa-spinner fa-spin"></i>
                                        :
                                        "UPDATE FIRST IMAGE"
                                    }
                                </button>
                            </div>

                            <div className="sub-title">Slide 1</div>
                            <div className="text">
                                {postDetails.post ? postDetails.post.firstTextSlide : "loading"}
                            </div>
                        </div>
                        
                        <div className="tab">
                            <div className="image"
                                style={{
                                    backgroundImage: `url(${postDetails.post ? postDetails.post.secondImageSlide : "loading"})`,
                                    backgroundSize:`cover`,
                                    backgroundPosition:`center`
                                }}
                            ></div>

                            <div className="input input-file">
                                <span>Upload Second Image</span>
                                <input
                                    placeholder="Upload Profile Picture" 
                                    type="file" 
                                    autoComplete="off"
                                    onChange={onSelectFileTwo} 
                                />
                            </div>
    
                            {imageTwo && <img src={previewTwo} alt="profile preview" className="course-thumbnail-preview" />}

                            <div className="input">
                                <button 
                                    onClick={ReplaceSecondImage}
                                    className="btn waves-effect waves-light #64b5f6 teal darken-1 upload-button"
                                >
                                    {
                                        loading
                                        ?
                                        <i class="fa fa-spinner fa-spin"></i>
                                        :
                                        "UPDATE SECOND IMAGE"
                                    }
                                </button>
                            </div>

                            <div className="sub-title">Slide 2</div>
                            <div className="text">
                                {postDetails.post ? postDetails.post.secondTextSlide : "loading"}
                            </div>
                        </div>

                        <div className="tab">
                            <div className="image"
                                style={{
                                    backgroundImage: `url(${postDetails.post ? postDetails.post.thirdImageSlide : "loading"})`,
                                    backgroundSize:`cover`,
                                    backgroundPosition:`center`
                                }}
                            ></div>

                            <div className="input input-file">
                                <span>Upload Third Image</span>
                                <input
                                    placeholder="Upload Profile Picture" 
                                    type="file" 
                                    autoComplete="off"
                                    onChange={onSelectFileThree} 
                                />
                            </div>
    
                            {imageThree && <img src={previewThree} alt="profile preview" className="course-thumbnail-preview" />}

                            <div className="input">
                                <button 
                                    onClick={ReplaceThirdImage}
                                    className="btn waves-effect waves-light #64b5f6 teal darken-1 upload-button"
                                >
                                    {
                                        loading
                                        ?
                                        <i class="fa fa-spinner fa-spin"></i>
                                        :
                                        "UPDATE THIRD IMAGE"
                                    }
                                </button>
                            </div>

                            <div className="sub-title">Slide 3</div>
                            <div className="text">
                                {postDetails.post ? postDetails.post.thirdTextSlide : "loading"}
                            </div>
                        </div>
                        
                        <div className="tab">
                            <div className="image"
                                style={{
                                    backgroundImage: `url(${postDetails.post ? postDetails.post.fourthImageSlide : "loading"})`,
                                    backgroundSize:`cover`,
                                    backgroundPosition:`center`
                                }}
                            ></div>

                            <div className="input input-file">
                                <span>Upload Fourth Image</span>
                                <input
                                    placeholder="Upload Profile Picture" 
                                    type="file" 
                                    autoComplete="off"
                                    onChange={onSelectFileFour} 
                                />
                            </div>
    
                            {imageFour && <img src={previewFour} alt="profile preview" className="course-thumbnail-preview" />}

                            <div className="input">
                                <button 
                                    onClick={ReplaceFourthImage}
                                    className="btn waves-effect waves-light #64b5f6 teal darken-1 upload-button"
                                >
                                    {
                                        loading
                                        ?
                                        <i class="fa fa-spinner fa-spin"></i>
                                        :
                                        "UPDATE FOURTH IMAGE"
                                    }
                                </button>
                            </div>

                            <div className="sub-title">Slide 4</div>
                            <div className="text">
                                {postDetails.post ? postDetails.post.fourthTextSlide : "loading"}
                            </div>
                        </div>
                    </div>


                    <div className="pdf">
                        <a className="link" href={postDetails.post ? postDetails.post.pdf : "loading"} rel="noopener noreferrer" target="_blank">
                            <img src={pdf} alt="pdf" />
                            Anatomy_and_Microbiology.zip
                        </a>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Terms
