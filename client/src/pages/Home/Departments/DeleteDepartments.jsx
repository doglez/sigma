import { Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const DeleteDepartments = () => {
    return (
        <div className="container">
            <Formik
                initialValues={{
                    departmentNumber: "23aser",
                    name: "Data Center",
                    email: "dc@example.com",
                }}
                onSubmit={(values) => {
                    // props.login(values)
                    toast.success("Successfully deleted");
                    console.log(values);
                }}
            >
                <Form className="text-center">
                    <h1 className="text-danger pt-4 ">
                        Warning you are going to delete the department Data
                        Center
                    </h1>
                    <h5 className="text-danger pb-4">
                        This change is irreversible.
                    </h5>

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
                                    disabled
                                />
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
                                    disabled
                                />
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
                                    placeholder="Company Name"
                                    required
                                    disabled
                                />
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                    <div className="d-flex justify-content-start mt-3">
                        <button
                            type="submit"
                            className="btn btn-danger col-lg-1 col-md-2 me-3"
                        >
                            Delete
                        </button>
                        <Link
                            role="button"
                            to="/home/departments"
                            className="btn btn-secondary col-lg-1 col-md-2"
                        >
                            Cancel
                        </Link>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default DeleteDepartments;
