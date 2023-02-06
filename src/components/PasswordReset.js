import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function PasswordReset() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const setVal = (e) => {
        setEmail(e.target.value)
    };

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validate: (values) => {
            let error = {};

            if (!values.email) {
                error.email = "Please enter the email"
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                error.email = 'Invalid email address';
            }

            return error;
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const data = await axios.post("https://auth-backend-qgdn.onrender.com/sendpasswordlink", values);
                setEmail("Reset link send succsfully to your email");
                setMessage(true);
                formik.values.email = '';
                setLoading(false);

            } catch (error) {
                setLoading(false);
                console.log(error);
                setEmail("User not found");

                setMessage(true);

            }
        }
    });

    return (
        <div class="container">

            <div class="row justify-content-center">

                <div class="col-xl-10 col-lg-12 col-md-9">

                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                            <p class="mb-4">We get it, stuff happens. Just enter your email address below
                                                and we'll send you a link to reset your password!</p>
                                        </div>
                                        {message ? <p className='text-success fs-6'>{email}</p> : <p className='text-danger fs-6'>{email}</p>}
                                        <form class="user" onSubmit={formik.handleSubmit}>
                                            <div class="form-group">
                                                <input name={"email"} value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    type={"email"}
                                                    class="form-control form-control-user" id="exampleInputEmail"
                                                    placeholder="Enter Your Email..." />
                                                <span className='ml-3'>{formik.errors.email}</span>
                                            </div>
                                            <input type={'submit'} value={`${isLoading ? 'Loading...' : 'Reset Password'}`} class="btn btn-primary btn-user btn-block" disabled={`${isLoading ? true : ""}`} />
                                        </form>
                                        <hr />
                                        <div class="text-center">
                                            <Link to={'/admin-register'} class="small">Create an Account!</Link>
                                        </div>
                                        <div class="text-center">
                                            <Link to={'/'} class="small">Already have an account? Login!</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div >
    )
}

export default PasswordReset