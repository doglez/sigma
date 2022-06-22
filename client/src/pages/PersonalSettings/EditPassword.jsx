import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

YupPassword(Yup);

const EditPassword = () => {
    const [viewPass, setViewPass] = useState(false);

    const hadleView = () => {
        if (viewPass === false) {
            setViewPass(true);
        } else if (viewPass === true) {
            setViewPass(false);
        }
    };

    return (
        <div className="container">
            <Formik
                initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    passwordConfirm: "",
                }}
                validationSchema={Yup.object({
                    currentPassword: Yup.string().required(
                        "Your password is required."
                    ),
                    newPassword: Yup.string()
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
                            "Your password must contain at least one symbol."
                        )
                        .minNumbers(
                            1,
                            "Your password must contain at least one number."
                        )
                        .minUppercase(
                            1,
                            "Your password must contain at least one upper case."
                        )
                        .notOneOf(
                            [Yup.ref("password"), null],
                            "Cannot be the same as your old password."
                        ),
                    passwordConfirm: Yup.string()
                        .oneOf(
                            [Yup.ref("newPassword"), null],
                            "Confirmation must match."
                        )
                        .required("Confirmation is required."),
                })}
                onSubmit={(values) => {
                    // props.login(values)
                    toast.success("Upload Success");
                    console.log(values);
                }}
            >
                <Form className="text-center">
                    <h1 className="text-deep-saffron py-4 ">
                        Edit your password
                    </h1>

                    <div className="col-5">
                        <div className="input-group">
                            <label
                                className="input-group-text col-4 col-3"
                                htmlFor="currentPassword"
                            >
                                Current Password
                            </label>
                            <div className="form-control">
                                <div className="d-flex justify-content-between">
                                    <Field
                                        name="currentPassword"
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
                        </div>
                        <div className="text-danger error-validation p-0 text-start">
                            <ErrorMessage name="currentPassword" />
                        </div>
                    </div>
                    <div className="col-5 my-3">
                        <div className="input-group">
                            <label
                                className="input-group-text col-4 col-3"
                                htmlFor="newPassword"
                            >
                                New Password
                            </label>
                            <div className="form-control">
                                <div className="d-flex justify-content-between">
                                    <Field
                                        name="newPassword"
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
                        </div>
                        <div className="text-danger error-validation p-0 text-start">
                            <ErrorMessage name="newPassword" />
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="input-group">
                            <label
                                className="input-group-text col-4 col-3"
                                htmlFor="passwordConfirm"
                            >
                                Password Confirm
                            </label>
                            <div className="form-control">
                                <div className="d-flex justify-content-between">
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
                        </div>
                        <div className="text-danger error-validation p-0 text-start">
                            <ErrorMessage name="passwordConfirm" />
                        </div>
                    </div>
                    <ToastContainer />

                    <div className="d-flex justify-content-start mt-3">
                        <button
                            type="submit"
                            className="btn btn-primary col-lg-1 col-md-2 me-3"
                        >
                            Save
                        </button>
                        <Link
                            role="button"
                            to="/personalsettings"
                            className="btn btn-danger col-lg-1 col-md-2"
                        >
                            Cancel
                        </Link>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default EditPassword;
