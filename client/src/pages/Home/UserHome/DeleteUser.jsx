import React from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoUserPhoto from "../../../assets/images/NoUserPhoto.png";
import { Link } from "react-router-dom";

const DeleteUser = () => {
    return (
        <div className="container">
            <Formik
                initialValues={{
                    collaboratorNumber: "45aser",
                    name: "Danilo",
                    lastName: "Gonzalez",
                    department: "Data Center",
                    country: "Honduras",
                    stateProvince: "Francisco Morazan",
                    phone: "+50000000",
                    email: "dg@gmail.com",
                }}
                onSubmit={(values) => {
                    // props.login(values)
                    toast.success("Upload Success");
                    console.log(values);
                }}
            >
                <Form className="text-center">
                    <h1 className="text-danger pt-4 ">
                        Warning you are going to delete the user Danilo
                    </h1>
                    <h5 className="text-danger pb-4">
                        This change is irreversible.
                    </h5>

                    <div className="row">
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="collaboratorNumber"
                                >
                                    Collaborator #
                                </label>
                                <Field
                                    name="collaboratorNumber"
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
                                    htmlFor="lastName"
                                >
                                    Last Name
                                </label>
                                <Field
                                    name="lastName"
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
                                    htmlFor="country"
                                >
                                    Country
                                </label>
                                <Field
                                    name="country"
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
                                    htmlFor="stateProvince"
                                >
                                    State/Province
                                </label>
                                <Field
                                    name="stateProvince"
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
                                    htmlFor="phone"
                                >
                                    Phone
                                </label>
                                <Field
                                    name="phone"
                                    className="form-control"
                                    type="text"
                                    placeholder="Company Name"
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
                            to="/home/users"
                            className="btn btn-secondary col-lg-1 col-md-2"
                        >
                            Cancel
                        </Link>
                    </div>
                </Form>
            </Formik>
            <div className="d-flex justify-content-center">
                <img
                    src={NoUserPhoto}
                    className="rounded-circle photo-user-large mt-3"
                    alt="..."
                />
            </div>
        </div>
    );
};

export default DeleteUser;
