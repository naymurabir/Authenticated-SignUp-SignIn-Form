import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Login = () => {

    const [loginError, setLoginError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const emailRef = useRef()

    const handleLogIn = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);

        setSuccess('')
        setLoginError('')

        if (!password) {
            setLoginError("Please input password to login")
            return;
        }

        else if (password.length < 6) {
            setLoginError("Password must be 6 characters long.");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setLoginError("Password must have at least one uppercase letter.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user
                if (!user.emailVerified) {
                    setLoginError("Please verify your email first!")
                }
                else {
                    setSuccess("User Login Successful.")
                    toast("User Login Successful.")
                }

            })
            .catch(error => {
                setLoginError(error.message)
            })
    }

    const handleForgotPassword = () => {
        const email = emailRef.current.value

        if (!email) {
            setLoginError("Please input a email address.")
            return;
        }
        else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            setLoginError("Please input a valid email address.")
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess("Password reset email sent!")
                toast("Password reset email sent!")
            })
            .catch(error => {
                setLoginError(error.message)
            })
    }

    return (
        <div className="hero h-[580px] bg-[#FF8C9B]">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-[#F6AEB9] h-[520px] w-[300px]">
                    <div className="card-body">

                        <h2 className="text-xl font-bold text-center text-[271F48]">Log In</h2>

                        <form onSubmit={handleLogIn}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    name="email"
                                    placeholder="Email..." className="input input-bordered" required />
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

                                <div className="flex items-center mt-2">
                                    <input type="checkbox" name="remember" id="remember" />
                                    <label className="ml-2 text-sm" htmlFor="remember">Remember me</label>
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <button className="bg-[#461F56] text-white font-semibold px-2 py-2 rounded-md">Log In</button>
                            </div>

                            <div className="flex justify-center">
                                <label className="label">
                                    <a onClick={handleForgotPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                        </form>

                        {
                            success && <p className="text-sm text-green-600 font-semibold">{success}</p>
                        }

                        {
                            loginError && <p className="text-sm text-rose-600 font-semibold">{loginError}</p>
                        }

                        <div className="flex justify-center mt-20">
                            <Link to="/register"> <p className="text-sm font-semibold">Do not have an Account? Sign Up</p></Link>
                        </div>
                    </div>
                    <ToastContainer></ToastContainer>
                </div>
            </div>
        </div>
    );
};

export default Login;