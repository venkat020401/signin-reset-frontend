import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

function UpdatePassword() {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const [isShown, setIsSHown] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: (values) => {
      let error = {};

      if (!values.password) {
        error.password = "*Enter the new password";
      }
      if (!values.confirm_password) {
        error.confirm_password = "*Enter the confirm password";
      }
      if (values.password !== values.confirm_password) {
        error.confirm_password = "Password does not match";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        console.log(params.id);
        setLoading(true);
        const data = await axios.put(
          `https://signin-reset-backend.onrender.com/password-update/${params.id}`,
          values
        );
        console.log(data);
        formik.values.password = "";
        formik.values.confirm_password = "";
        setLoading(false);
        alert("Password reset success.. Please Login!");
        navigate("/");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
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
                      <h1 class="h4 text-gray-900 mb-2">
                        Forgot Your Password Here
                      </h1>
                    </div>
                    <form class="user" onSubmit={formik.handleSubmit}>
                      <div class="form-group">
                        <input
                          name={"password"}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          type={isShown ? "text" : "password"}
                          class="form-control form-control-user"
                          id="exampleInputEmail"
                          placeholder="New Password"
                        />
                        <small className="ml-3" style={{ color: "crimson" }}>
                          {formik.errors.password}
                        </small>
                        <input
                          name={"confirm_password"}
                          value={formik.values.confirm_password}
                          onChange={formik.handleChange}
                          type={isShown ? "text" : "password"}
                          class="form-control form-control-user mt-2"
                          id="exampleInputEmail"
                          placeholder="Confirm Password"
                        />
                        <small className="ml-3" style={{ color: "crimson" }}>
                          {formik.errors.confirm_password}
                        </small>
                        <div class="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            checked={isShown}
                            onChange={()=>setIsSHown(!isShown)}
                            class="custom-control-input"
                            id="customCheck"
                          />
                          <label class="custom-control-label" for="customCheck">
                            Show Password
                          </label>
                        </div>
                      </div>
                      <input
                        type={"submit"}
                        value={`${isLoading ? "Loading..." : "Reset Password"}`}
                        class="btn btn-primary btn-user btn-block"
                        disabled={`${isLoading ? true : ""}`}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
