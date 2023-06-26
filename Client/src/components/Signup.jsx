import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Validation from "./Validation";
import Footer from "./Footer";
import "./css/login-signup.css";

function Signup() {

    const [details, setDetails] = useState({
        name: "",
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
            Axios.post("http://localhost:4500/signup", details)
                .then(navigate("/"));
        };
    }

    return (
        <div>
            <header>
                <img src="assets/notes.png"></img>
                <h1>Note-Vault </h1>
            </header>
            <div className='login-container'>
                <div className='login-box'>
                    <form action="" onSubmit={submitDetails}>
                        <h2>SIGN UP</h2>
                        <div>
                            <label htmlFor="name"><strong>Name</strong></label>
                            <input onChange={inputDetails} type="text" placeholder="Enter Name" className="input" name="name" required autoComplete="off"/>
                            {/* {errors.name && <span className="text-danger">{errors.name}</span>} */}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input onChange={inputDetails} type="email" placeholder="Enter Email" className="input" name="email" required />
                            {/* {errors.email && <span className="text-danger">{errors.email}</span>} */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input onChange={inputDetails} type="password" placeholder="Enter Password" className="input" name="password" required />
                            {/* {errors.password && <span className="text-danger">{errors.password}</span>} */}
                        </div>
                        <button type="submit" className="login-button"> Sign Up</button>
                        <p>You are agree to our terms and policies</p>
                        <div className="login-create">
                            <Link to="/" className="login-create-button">Already have an Account</Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Signup;