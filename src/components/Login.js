import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState(false);

    const admin_formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: (values) => {
            let error = {};

            if (!values.password) {
                error.password = "Please enter the password"
            }

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
                const admin_login = await axios.post("http://localhost:8000/login", values);
                navigate("/dashboard");
                setLoading(false);

            } catch (error) {
                console.log(error);
                setErrorMsg(true);
                setLoading(false);

            }
        }
    });

    return (
        <>
            <div class="container">

                <div class="row justify-content-center">
                    <div class="col-xl-10 col-lg-12 col-md-9">
                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-0">

                                <div class="row">
                                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div class="col-lg-6">
                                        <div class="p-5">
                                            <div class="text-center">
                                                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form class="user" onSubmit={admin_formik.handleSubmit}>
                                                <div class="form-group">
                                                    <input name={"email"} value={admin_formik.values.email} onChange={admin_formik.handleChange} type={"email"} class="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Enter Email" />
                                                    <span className='ml-2'>{admin_formik.errors.email}</span>
                                                </div>
                                                <div class="form-group">
                                                    <input name={"password"} value={admin_formik.values.password} onChange={admin_formik.handleChange} type={"password"} class="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Enter Password" />
                                                    <span className='ml-2'>{admin_formik.errors.password}</span>
                                                    <div class="custom-control custom-checkbox small">
                                                        <input type="checkbox" class="custom-control-input" id="customCheck" />
                                                        <label class="custom-control-label" for="customCheck">Show Password</label>
                                                    </div>
                                                </div>
                                                <input type={"submit"} value={`${isLoading ? "Loading..." : "Login"}`} class="btn btn-primary btn-user btn-block" disabled={`${isLoading ? false : ""}`} />
                                                {
                                                    ErrorMsg ? <p className='text-center mt-3' style={{ color: "crimson" }}>Email / Password Wrong</p> : ""
                                                }
                                            </form>
                                            <hr />
                                            <div class="text-center">
                                                <Link to={"password-reset"} class="small">Forgot Password?</Link>
                                            </div>
                                            <div class="text-center">
                                                <Link to={"register"} class="small">Create an Account!</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Login