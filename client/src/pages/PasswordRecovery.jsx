import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import React, { useState } from "react";
import Logo from "../assets/images/summation.png";

YupPassword(Yup);

const PasswordRecovery = () => {
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
                initialValues={{ password: "", passwordConfirm: "" }}
                validationSchema={Yup.object({
                    password: Yup.string()
                        .max(
                            12,
                            "Password must be between 6 and 12 characters."
                        )
                        .min(6, "Password must be between 6 and 12 characters.")
                        .required(
                            "Password must be between 6 and 12 characters."
                        )
                        .minSymbols(
                            1,
                            "Your password must contain at least one symbol"
                        )
                        .minNumbers(
                            1,
                            "Your password must contain at least one number"
                        )
                        .minUppercase(
                            1,
                            "Your password must contain at least one upper case"
                        ),
                    passwordConfirm: Yup.string().oneOf(
                        [Yup.ref("password"), null],
                        "Passwords must match"
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
                    <h4 className="fw-bold">Enter new password.</h4>

                    <div className="row">
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
                        <div className="mt-3 border rounded d-flex flex-column">
                            <label htmlFor="inputPassword">
                                <i className="bi bi-key pe-1" />
                                Password Confirmation
                            </label>
                            <div className="row">
                                <Field
                                    name="passwordConfirm"
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
                            <ErrorMessage name="passwordConfirm" />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            Send
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default PasswordRecovery;
