import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../Actions/Post';
import './NewPost.css'
import {useAlert} from 'react-alert'
import { loadUser } from '../../Actions/User';
const NewPost = () => {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const alert = useAlert()
    
    const dispatch = useDispatch()

    const {loading,error,message} = useSelector((state)=>state.like)

    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        const Reader = new FileReader()
        Reader.readAsDataURL(file)
        

        Reader.onload = (e)=>{
            if(Reader.readyState === 2){
                // console.log(Reader.result
                setImage(e.target.result)
            }
        }
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        await dispatch(createNewPost(caption,image))
        dispatch(loadUser())
    }
    
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:'clearErrors'})
        }

        if(message){
            alert.success(message)
            dispatch({type:'clearMessage'})
        }
    },[alert,dispatch,message,error])

    return (
        <div className="newPost">
            <form className="newPostForm" onSubmit = {submitHandler}>
                <Typography variant="h3">New Post</Typography>

                {image && <img src = {image} alt = "post"/>}
                <input type="file" accept = "image/*" onChange = {handleImageChange}/>
                <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled = {loading} type = "submit">Post</Button>
            </form>
        </div>
    )
}

export default NewPost
