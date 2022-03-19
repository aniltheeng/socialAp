import React, { useState,useEffect } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { loginUser } from "../../Actions/User";
import {useAlert} from 'react-alert'
const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  const {error} = useSelector((state)=>state.user)

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(()=>{
    if(error){
        alert.error(error)
        dispatch({type:'clearErrors'})
    }
},[alert,error,dispatch])



  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography varient="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={(e) => setPasword(e.target.value)}
          value={password}
          placeholder="password"
          required
        />
        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>
        <Button type="submit">Login</Button>
        <Link to="/register">
          <Typography>New User</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
