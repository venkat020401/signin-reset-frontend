import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      First_name: "",
      Last_name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validate: (values) => {
      let error = {};

      if (!values.First_name) {
        error.First_name = "Please enter first name"
      }
      if (!values.Last_name) {
        error.Last_name = "Please enter last name"
      }
      if (!values.email) {
        error.email = "Please enter the email"
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        error.email = 'Invalid email address';
      }
      if (!values.password) {
        error.password = "Please enter password"
      }
      if (!values.confirm_password) {
        error.confirm_password = "Enter confirm password"
      }
      else if (values.password != values.confirm_password) {
        error.confirm_password = "Password does not match"
      }
      return error;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post("http://localhost:8000/register", values);
        alert("registeration success💐");
        navigate("/");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

  });
  return (
    <div class="container">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">

          <div class="row">
            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div class="col-lg-7">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form class="user" onSubmit={formik.handleSubmit}>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input name={"First_name"} value={formik.values.First_name} onChange={formik.handleChange} type={"text"} class="form-control form-control-user" id="exampleFirstName"
                        placeholder="First Name" />
                      <span className='ml-3'>{formik.errors.First_name}</span>
                    </div>
                    <div class="col-sm-6">
                      <input name={"Last_name"} value={formik.values.Last_name} onChange={formik.handleChange} type={"text"} class="form-control form-control-user" id="exampleLastName"
                        placeholder="Last Name" />
                      <span className='ml-3'>{formik.errors.Last_name}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <input name={"email"} value={formik.values.email} onChange={formik.handleChange} type={"email"} class="form-control form-control-user" id="exampleInputEmail"
                      placeholder="Email Address" />
                    <span className='ml-3'>{formik.errors.email}</span>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input name={"password"} value={formik.values.password} onChange={formik.handleChange} type={"password"} class="form-control form-control-user"
                        id="exampleInputPassword" placeholder="Password" />
                      <span className='ml-3'>{formik.errors.password}</span>
                    </div>
                    <div class="col-sm-6">
                      <input name={"confirm_password"} value={formik.values.confirm_password} onChange={formik.handleChange} type="password" class="form-control form-control-user"
                        id="exampleRepeatPassword" placeholder="Confirm Password" />
                      <span className='ml-3'>{formik.errors.confirm_password}</span>
                    </div>
                  </div>
                  <input type={"submit"} value={`${isLoading ? "Loading..." : "Register"}`} class="btn btn-primary btn-user btn-block" disabled={`${isLoading ? false : ""}`} />
                </form>
                <hr />
                <div class="text-center">
                  <Link to={"/password-reset"} class="small">Forgot Password?</Link>
                </div>
                <div class="text-center">
                  <Link to={"/"} class="small">Already have an account? Login!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Register