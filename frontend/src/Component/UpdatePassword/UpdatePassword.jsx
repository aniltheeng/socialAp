import { Button, Typography } from '@mui/material'
import React, {useState,useEffect } from 'react'
import { updatePassword } from '../../Actions/User'
import './UpdatePassword.css'
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
const UpdatePassword = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {loading,error,message} = useSelector((state)=>state.user)

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(updatePassword(oldPassword,newPassword,confirmPassword))
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:"clearErrors"})
        }

        if(message){
            alert.success(message)
            dispatch({type:"clearMessage"})
        }
    },[alert,message,error,dispatch])

    

    return (
        <div className="updatePassword">
            <form className="updatePasswordForm" onSubmit={submitHandler}>
                <Typography variant = "h4" style ={{padding:'2vmax'}} >Update Pasword</Typography>
                <input type="password" value = {oldPassword}  className="updatePasswordInputs" placeholder = "oldPassword" onChange = {(e)=>setOldPassword(e.target.value)} 
                />
                 <input type="password" value = {newPassword}  className="updatePasswordInputs" placeholder = "newPassword" onChange = {(e)=>setNewPassword(e.target.value)} 
                />
                <input type="password" value = {confirmPassword}  className="updatePasswordInputs" placeholder = "confirmPassword" onChange = {(e)=>setConfirmPassword(e.target.value)} 
                />
                <Button disabled = {loading} type = "submit">
                    Update
                </Button>
            </form>
        </div>
    )
}

export default UpdatePassword
