import { Avatar, Button, Typography } from '@mui/material'
import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, updateProfile } from '../../Actions/User'
import './UpdateProfile.css'
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader'
const UpdateProfile = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const {loading:updateLoading,error:updateError,message} = useSelector((state)=>state.like)
    const {loading,user,error} = useSelector((state)=>state.user)

    const [name,setName] = useState(user.name)
    const [email,setEmail] = useState(user.email)
    const [avatar,setAvatar] = useState("")
    const [prevAvatar,setPrevAvatar] = useState(user.avatar.url)

    const submitHandler = async(e)=>{
        e.preventDefault()
        await dispatch(updateProfile(name,email,avatar))
        dispatch(loadUser())
    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0]

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = ()=>{
            if(reader.readyState === 2){
                setPrevAvatar(reader.result)
                setAvatar(reader.result)
            }
        }
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:'clearErrors'})
        }

        if(updateError){
            alert.error(updateError)
            dispatch({type:'clearErrors'})
        }

        if(message){
            alert.success(message)
            dispatch({type:'clearMessage'})
        }
    },[alert,updateError,error,message,dispatch])

    return (
        loading ? <Loader/> :
        <div className="updateProfile">
            <form className="updateProfileForm" onSubmit={submitHandler}>
                <Typography variant = "h4">Update Profile</Typography>
                <Avatar src = {prevAvatar} alt = "user" sx = {{height:"10vmax",width:"10vmax"}} />

                <input
                    type="file"
                    accept = "image/*"
                    onChange={handleImageChange}
                 />
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className = "updateProfileInputs"
                    placeholder="Enter Name"
                    required
                />

                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className = "updateProfileInputs"
                    placeholder="Email"
                    required
                 />

               

                 <Button disabled = {updateLoading} type = "submit">Update</Button>
            </form>
        </div>
    )
}

export default UpdateProfile
