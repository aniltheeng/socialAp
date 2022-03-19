import React, { useState,useEffect } from "react";
import "./ForgotPassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector} from "react-redux";
import {useAlert} from 'react-alert'
import { forgotPassword } from "../../Actions/User";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert()

  const [email, setEmail] = useState("");

  const {loading,error,message} = useSelector((state)=>state.like)

  const forgotPasswordHandler = (e)=>{
      e.preventDefault()
      dispatch(forgotPassword(email))
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
},[alert,error,dispatch,message])



  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={forgotPasswordHandler}>
        <Typography varient="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className = "forgotPasswordInputs"
          placeholder="Email"
          required
        />
        <Button disabled = {loading} type="submit">Forgot Password</Button>
      </form>
    </div>
  );
};

export default ForgotPassword
