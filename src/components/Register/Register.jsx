import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {

    const [success, setSuccess] = useState('')
    const [registerError, setRegisterError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const acceptedTerms = e.target.terms.checked
        console.log(email, password);

        setSuccess('')
        setRegisterError('')

        if (password.length < 6) {
            setRegisterError("Password must be 6 characters long")
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError("Password must have at least one uppercase letter.")
            return
        }
        else if (!acceptedTerms) {
            setRegisterError("Please accept our terms and conditions before sign up.")
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                console.log(user);
                setSuccess("User has been added successfully.")
                toast("User has been added successfully.")

                // Update user profile
                updateProfile(user, {
                    displayName: name,
                })
                    .then(() => {
                        setSuccess("Profile updated.")
                        toast("Profile updated")
                    })
                    .catch(error => {
                        setRegisterError(error.message)
                    })

                // Email verification
                sendEmailVerification(user)
                    .then(() => {
                        setSuccess("Email verification sent!")
                        toast("Email verification sent!")
                    })
                    .catch(error => {
                        setRegisterError(error.message)
                    })
            })
            .catch(error => {
                console.log("Error:", error);
                setRegisterError(error.message)
            })
    }

    return (

        <div className="hero h-[580px] bg-[#FF8C9B]">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-[#F6AEB9] h-[520px] w-[300px]">
                    <div className="card-body">

                        <h2 className="text-xl font-bold text-center text-[271F48]">Create New Account</h2>

                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Name..." className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email..." className="input input-bordered" required />
                            </div>

                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password..." className="input input-bordered" required />

                                <span className="text-lg absolute top-[52px] left-52" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>} </span>

                                <div>
                                    <input type="checkbox" name="terms" id="terms" />
                                    <label className="ml-2 text-sm" htmlFor="terms">I agree with <a className="text-purple-800" href="">Terms & Conditions</a></label>
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <button className="bg-[#461F56] text-white font-semibold px-2 py-2 rounded-md">Create Account</button>
                            </div>

                        </form>

                        {
                            success && <p className="text-sm text-green-600 font-semibold">{success}</p>
                        }

                        {
                            registerError && <p className="text-sm text-rose-600 font-semibold">{registerError}</p>
                        }

                        <div className="flex justify-center mt-28">
                            <Link to="/login"> <p className="text-sm font-semibold">Already have an account? Sign In</p></Link>
                        </div>
                    </div>
                    <ToastContainer></ToastContainer>
                </div>
            </div>
        </div>
    );
};

export default Register;