import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Logo from "../assets/images/summation.png";

const ForgotPassword = () => {
    return (
        <div className="row d-flex justify-content-center mt-5">
            <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("Please enter a valid email")
                        .required("Please enter a valid email"),
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
                    <h4 className="fw-bold">Request to recover password.</h4>

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
                        <button type="submit" className="btn btn-primary mt-3">
                            Recovery
                        </button>
                    </div>
                    <Link
                        to="/login"
                        className="text-decoration-none text-secondary"
                    >
                        Return to login?
                    </Link>
                </Form>
            </Formik>
        </div>
    );
};

export default ForgotPassword;
