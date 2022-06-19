import React from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const DeletePlan = () => {
    return (
        <div className="container">
            <Formik
                initialValues={{
                    year: "2022",
                    name: "Servers",
                    department: "Data Center",
                    chief: "Danilo Gonzalez",
                }}
                onSubmit={(values) => {
                    // props.login(values)

                    toast.success("Successfully deleted");
                    console.log(values);
                }}
            >
                <Form className="text-center">
                    <h1 className="text-danger pt-4 ">
                        Warning you are going to delete the Plan
                    </h1>
                    <h5 className="text-danger pb-4">
                        This change is irreversible.
                    </h5>

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
                                    className="form-control"
                                    name="year"
                                    type="number"
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
                                    htmlFor="department"
                                >
                                    Department
                                </label>
                                <Field
                                    name="department"
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
                                    htmlFor="chief"
                                >
                                    Chief
                                </label>
                                <Field
                                    name="chief"
                                    className="form-control"
                                    type="text"
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
                            to="/maintenance/maintenanceplans"
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

export default DeletePlan;
