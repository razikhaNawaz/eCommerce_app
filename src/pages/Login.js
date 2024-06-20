import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import "./Login.css";

const Login = () => {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const [isLogin, setIsLogin] = useState(true);
  const [sendingReq,setSendingReq]=useState(false);
 
  const authCtx = useContext(AuthContext);

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    setSendingReq(true);

    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;

    let url;
    if (isLogin) {
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEEV5oe8QHzMWZ9RLhehZG6wu6Ez0agmQ"
    } else {
      url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEEV5oe8QHzMWZ9RLhehZG6wu6Ez0agmQ";
    }
    fetch(url,{
      method:'POST',
      body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
      }),
      headers:{
          'Content-Type': 'application/json'
      }
  }).then((res)=>{
      setSendingReq(false);
      if(res.ok){
          let data=res.json();
          (data).then((resp)=>{
              authCtx.login(resp.idToken, enteredEmail);
              history.replace('/store')
              //console.log(resp.idToken);
          })
      }else{
          const data =res.json();
      data.then((data)=>{
          alert(data.error.message);
      })
      }
  })
}


  return (
    <div className="login-box">
      <form onSubmit={submitHandler} className="login-form">
        <h1>User Login</h1>
        <label htmlFor="email">Email Id</label>
        <input id="email" type="email" ref={emailInputRef} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordInputRef} />
        {sendingReq && <p>Sending Request...</p>}
       {!sendingReq && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
        <button type="button" className="switch-btn" onClick={switchHandler}>
          {isLogin ? "Create ne account" : "Login with existing account"}
        </button>
      </form>
    </div>
  );
};


export default Login;