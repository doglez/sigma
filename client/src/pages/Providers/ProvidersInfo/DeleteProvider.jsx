import React from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const DeleteProvider = () => {
    return (
        <div className="container">
            <Formik
                initialValues={{
                    ein: "2asedri2",
                    name: "Doglez",
                    address: "Arasler laserd",
                    country: "Honduras",
                    phone: "+500005",
                    email: "info@doglez.com",
                    website: "https://doglez.com/",
                }}
                onSubmit={(values) => {
                    // props.login(values)
                    toast.success("Successfully deleted");
                    console.log(values);
                }}
            >
                <Form className="text-center">
                    <h1 className="text-danger pt-4 ">
                        Warning you are going to delete the Provider X
                    </h1>
                    <h5 className="text-danger pb-4">
                        This change is irreversible.
                    </h5>

                    <div className="row">
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="ein"
                                >
                                    EIN
                                </label>
                                <Field
                                    name="ein"
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
                                    htmlFor="address"
                                >
                                    Address
                                </label>
                                <Field
                                    name="address"
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
                                    htmlFor="country"
                                >
                                    Country
                                </label>
                                <Field
                                    name="country"
                                    className="form-control"
                                    required
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="phone"
                                >
                                    Phone
                                </label>
                                <Field
                                    name="phone"
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
                                    required
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="website"
                                >
                                    Website
                                </label>
                                <Field
                                    name="website"
                                    className="form-control"
                                    type="text"
                                    required
                                    disabled
                                />
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                    <div className="d-flex justify-content-start">
                        <button
                            type="submit"
                            className="btn btn-danger col-lg-1 col-md-2 me-3"
                        >
                            Delete
                        </button>
                        <Link
                            role="button"
                            to="/providers"
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

export default DeleteProvider;
