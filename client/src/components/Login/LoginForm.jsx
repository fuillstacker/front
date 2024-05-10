import React, { useState } from "react";
import './login.css'
import Input from "../../utils/input/Input";
import { login } from "../../action/user";
import { useDispatch } from "react-redux";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    return (
        <div className="login">
            <div className="login_header">Login</div>
            <Input value={email} setValue={setEmail} type="email" placeholder="Enter email...." /><br />
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter password...." /><br />
            <button className="login__btn" onClick={() => dispatch(login(email, password))}>Login</button>
        </div>
    )
}

export default Login