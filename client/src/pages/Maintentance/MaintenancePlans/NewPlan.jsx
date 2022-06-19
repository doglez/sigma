import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const validate = (value) => {
    let errorMessage;

    if (!/\d{4}/.test(value)) {
        errorMessage = "Invalid year format";
    }
    return errorMessage;
};

const NewPlan = () => {
    return (
        <div className="container">
            <Formik
                initialValues={{
                    year: new Date().getFullYear(),
                    name: "",
                    department: "",
                    chief: "",
                    timesYear: 12,
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(3, "Name must be at least 3 characters.")
                        .required("Name is required"),
                    department: Yup.string().required("Department is required"),
                    chief: Yup.string().required("Chief is required"),
                    timesYear: Yup.number()
                        .min(1, "At least once a year.")
                        .max(12, "Maximum 12 times a year.")
                        .required("Tiemes a year required"),
                })}
                onSubmit={(values) => {
                    // props.login(values)

                    toast.success("Upload Success");
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className="text-center">
                        <h1 className="text-deep-saffron py-4 ">
                            New Maintenance Plan Information
                        </h1>

                        <div className="row">
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="year"
                                    >
                                        Year
                                    </label>
                                    <Field
                                        validate={validate}
                                        className="form-control"
                                        name="year"
                                        type="number"
                                    />
                                </div>
                                {errors.year && touched.year ? (
                                    <div className="text-danger error-validation p-0 text-start">
                                        {errors.year}
                                    </div>
                                ) : null}
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
                                        htmlFor="department"
                                    >
                                        Department
                                    </label>
                                    <Field
                                        name="department"
                                        className="form-control"
                                        as="select"
                                        required
                                    >
                                        <option defaultValue>
                                            Select your Department
                                        </option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </Field>
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="department" />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="chief"
                                    >
                                        Chief
                                    </label>
                                    <Field
                                        name="chief"
                                        className="form-control"
                                        as="select"
                                        required
                                    >
                                        <option defaultValue>
                                            Select your name
                                        </option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </Field>
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="chief" />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="timesYear"
                                    >
                                        Times a Year
                                    </label>
                                    <Field
                                        name="timesYear"
                                        className="form-control"
                                        type="number"
                                        required
                                    />
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="timesYear" />
                                </div>
                            </div>
                            <ToastContainer />
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
                                to="/maintenance/maintenanceplans"
                                className="btn btn-danger col-lg-1 col-md-2"
                            >
                                Cancel
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewPlan;
