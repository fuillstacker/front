import React, { useState } from "react";
import './register.css'
import Input from "../../utils/input/Input";
import { register } from "../../action/user";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    return (
        <div className="register">
            <div className="register_header">Register</div>
            <Input value={email} setValue={setEmail} type="email" placeholder="Enter email...." /><br />
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter password...." /><br />
            <button className="register__btn" onClick={() => register(email, password)}>Sign Up</button>
        </div>
    )
}

export default Register