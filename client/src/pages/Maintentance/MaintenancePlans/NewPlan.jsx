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
                    equipments: [],
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(3, "Name must be at least 3 characters.")
                        .required("Name is required"),
                    department: Yup.string().required("Department is required"),
                    chief: Yup.string().required("Chief is required"),
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
                                        as="select"
                                        required
                                    >
                                        <option value="1">Once a year</option>
                                        <option value="2">Twice a year</option>
                                        <option value="4">
                                            4 times a year
                                        </option>
                                        <option value="6">
                                            6 times a year
                                        </option>
                                        <option value="12">
                                            12 times a year
                                        </option>
                                    </Field>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <div
                                        className="input-group-text col-5"
                                        id="checkbox-group"
                                    >
                                        Equipments
                                    </div>
                                    <div
                                        className="form-control scrollable-vertical"
                                        role="group"
                                        aria-labelledby="checkbox-group"
                                    >
                                        <div className="form-check">
                                            <label
                                                className="form-check-label"
                                                htmlFor="server1"
                                            >
                                                Server 1
                                            </label>
                                            <Field
                                                type="checkbox"
                                                id="server1"
                                                className="form-check-input"
                                                name="equipments"
                                                value="Server 1"
                                            />
                                        </div>
                                        <div className="form-check">
                                            <label
                                                className="form-check-label"
                                                htmlFor="server2"
                                            >
                                                Server 2
                                            </label>
                                            <Field
                                                type="checkbox"
                                                id="server2"
                                                className="form-check-input"
                                                name="equipments"
                                                value="Server 2"
                                            />
                                        </div>
                                        <div className="form-check">
                                            <label
                                                className="form-check-label"
                                                htmlFor="server3"
                                            >
                                                Server 3
                                            </label>
                                            <Field
                                                type="checkbox"
                                                id="server3"
                                                className="form-check-input"
                                                name="equipments"
                                                value="Server 3"
                                            />
                                        </div>
                                        <div className="form-check">
                                            <label
                                                className="form-check-label"
                                                htmlFor="server4"
                                            >
                                                Server 4
                                            </label>
                                            <Field
                                                type="checkbox"
                                                id="server4"
                                                className="form-check-input"
                                                name="equipments"
                                                value="Server 4"
                                            />
                                        </div>
                                    </div>
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
