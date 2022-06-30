import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createDepartmentCrt } from "../../../redux/reducers/departmentsReducers/departmentSlice.js";

const NewDepartments = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    return (
        <div className="container">
            <Formik
                initialValues={{
                    departmentNumber: "",
                    name: "",
                    email: "",
                }}
                validationSchema={Yup.object({
                    departmentNumber: Yup.string()
                        .min(
                            3,
                            "Departments number must be at least 3 characters."
                        )
                        .required("Departments number is required"),
                    name: Yup.string()
                        .min(3, "Departments must be at least 3 characters.")
                        .required("Departments is required"),
                    email: Yup.string()
                        .email("Please enter a valid email")
                        .required("Please enter a valid email"),
                })}
                onSubmit={(values) => {
                    dispatch(createDepartmentCrt(values));
                    navigate("../", { replace: true });
                }}
            >
                <Form className="text-center">
                    <h1 className="text-deep-saffron py-4 ">
                        New Department Information
                    </h1>

                    <div className="row">
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="departmentNumber"
                                >
                                    Department #
                                </label>
                                <Field
                                    name="departmentNumber"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="departmentNumber" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <Field
                                    name="name"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <Field
                                    name="email"
                                    className="form-control"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-start mt-3">
                        <button
                            type="submit"
                            className="btn btn-primary col-lg-1 col-md-2 me-3"
                        >
                            Save
                        </button>
                        <Link
                            role="button"
                            to="/home/departments"
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

export default NewDepartments;
