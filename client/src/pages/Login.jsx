import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Logo from "../assets/images/summation.png";

const Login = () => {
    const [viewPass, setViewPass] = useState(false);

    const hadleView = () => {
        if (viewPass === false) {
            setViewPass(true);
        } else if (viewPass === true) {
            setViewPass(false);
        }
    };

    return (
        <div className="row d-flex justify-content-center mt-5">
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("Please enter a valid email")
                        .required("Please enter a valid email"),
                    password: Yup.string()
                        .max(
                            12,
                            "Password must be between 6 and 12 characters."
                        )
                        .min(6, "Password must be between 6 and 12 characters.")
                        .required(
                            "Password must be between 6 and 12 characters."
                        ),
                })}
                onSubmit={(values) => {
                    // props.login(values)
                    console.log(values);
                }}
            >
                <Form className="login-form shadow-lg bg-body rounded col-3">
                    <div className="d-flex justify-content-center">
                        <img
                            src={Logo}
                            alt="SIGMA-Logo"
                            className="img-fluid  col-3"
                        />
                    </div>
                    <h4 className="fw-bold">Log in to your account.</h4>

                    <div className="row">
                        <div className="border rounded d-flex flex-column">
                            <label htmlFor="inputEmail">
                                <i className="bi bi-envelope pe-1" />
                                Email
                            </label>
                            <Field
                                name="email"
                                className="border-0 login-input pt-1"
                                type="email"
                                placeholder="user@example.com"
                                required
                            />
                        </div>
                        <div className="text-danger error-login p-0">
                            <ErrorMessage name="email" />
                        </div>
                        <div className="mt-3 border rounded d-flex flex-column">
                            <label htmlFor="inputPassword">
                                <i className="bi bi-key pe-1" />
                                Password
                            </label>
                            <div className="row">
                                <Field
                                    name="password"
                                    className="border-0 login-input pt-1 col-sm-10"
                                    type={viewPass ? "text" : "password"}
                                    placeholder="********"
                                    required
                                />
                                <i
                                    className={
                                        viewPass
                                            ? "bi bi-eye-slash col-sm-2 btn py-0"
                                            : "bi bi-eye col-sm-2 btn py-0"
                                    }
                                    onClick={hadleView}
                                />
                            </div>
                        </div>
                        <div className="text-danger error-login p-0">
                            <ErrorMessage name="password" />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            Sign in
                        </button>
                    </div>
                    <Link
                        to="forgotpassword"
                        className="text-decoration-none text-secondary"
                    >
                        Forgot password?
                    </Link>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
