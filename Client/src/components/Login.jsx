import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Validation from "./Validation";
import Footer from "./Footer";
import "./css/login-signup.css";

function Login() {

    const [details, setDetails] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState([]);

    const inputDetails = (event) => {
        setDetails(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const navigate = useNavigate();

    const submitDetails = (event) => {
        event.preventDefault();
        setErrors(Validation(details));
        if (errors.email === "" && errors.password === "") {
            Axios.post("http://localhost:4500/login", details)
                .then(res => {
                    if (res.data === "Success") {
                        navigate("/notes")
                    } else {
                        alert("No record exists")
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div>
            <header>
                <img src="assets/notes.png"></img>
                <h1>Note-Vault </h1>
            </header>
            <div className='login-container'>
                <div className='login-box'>
                    <form action="" onSubmit={submitDetails} >
                        <h2>LOGIN</h2>
                        <div>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input className='input' onChange={inputDetails} type="username" placeholder="Enter Email" name="email" required/>
                            {/* {errors.email && <span className="text-danger">{errors.email}</span>} */}
                        </div>
                        <div>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input className='input' onChange={inputDetails} type="password" placeholder="Enter Password" name="password" required/>
                            {/* {errors.password && <span className="text-danger">{errors.password}</span>} */}
                        </div>
                        <button type="submit" className="login-button"> Log in</button>
                        <p>You are agree to our terms and policies</p>
                        <div className="login-create">
                            <Link to="/signup" className="login-create-button">Create Account</Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Login;