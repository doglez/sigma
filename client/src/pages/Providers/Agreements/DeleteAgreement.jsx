import React from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const DeleteAgreement = () => {
    return (
        <div className="container">
            <Formik
                initialValues={{
                    agreementNumber: "3ASER",
                    provider: "Doglez Inc.",
                    reference: "Servers & Storage",
                    startDate: "2021-06-17",
                    expDate: "2022-06-16",
                }}
                onSubmit={(values) => {
                    // props.login(values)
                    toast.success("Successfully deleted");
                    console.log(values);
                }}
            >
                <Form className="text-center">
                    <h1 className="text-danger pt-4 ">
                        Warning you are going to Delete a Agreement
                    </h1>
                    <h5 className="text-danger pb-4">
                        This change is irreversible.
                    </h5>

                    <div className="row">
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="agreementNumber"
                                >
                                    Agreement #
                                </label>
                                <Field
                                    name="agreementNumber"
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
                                    htmlFor="provider"
                                >
                                    Provider
                                </label>
                                <Field
                                    name="provider"
                                    className="form-control"
                                    as="select"
                                    required
                                    disabled
                                >
                                    <option defaultValue>
                                        Select a provider
                                    </option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </Field>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="reference"
                                >
                                    Reference
                                </label>
                                <Field
                                    name="reference"
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
                                    htmlFor="startDate"
                                >
                                    Start Date
                                </label>
                                <Field
                                    name="startDate"
                                    className="form-control"
                                    type="date"
                                    required
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="expDate"
                                >
                                    Expiration Date
                                </label>
                                <Field
                                    name="expDate"
                                    className="form-control"
                                    type="date"
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
                            to="/providers/agreements"
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

export default DeleteAgreement;
