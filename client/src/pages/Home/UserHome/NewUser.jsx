import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoUserPhoto from "../../../assets/images/NoUserPhoto.png";
import { Link } from "react-router-dom";

const NewUser = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [errorUpload, setErrorUpload] = useState();

    const filesSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const onSubmitFiles = () => {
        const formData = new FormData();

        if (!selectedFile) {
            setErrorUpload("You need to provide a file");
        } else if (selectedFile.size >= 1000000) {
            setErrorUpload("File size must be less than 1MB");
        } else if (
            selectedFile.type !== "image/png" &&
            selectedFile.type !== "image/jpeg"
        ) {
            setErrorUpload("We only support png or jpeg");
        } else {
            formData.append("file", selectedFile);

            axios
                .post(`${process.env.REACT_APP_API_URL}/upload`, formData)
                .then((res) => {
                    setErrorUpload();
                })
                .catch((err) => {
                    console.error(err.message);
                    toast.error("Upload Error");
                });
        }
    };

    return (
        <div className="container">
            <Formik
                initialValues={{
                    collaboratorNumber: "",
                    name: "",
                    lastName: "",
                    department: "",
                    country: "",
                    stateProvince: "",
                    phone: "",
                    email: "",
                }}
                validationSchema={Yup.object({
                    collaboratorNumber: Yup.string()
                        .min(
                            3,
                            "Collaborator number must be at least 3 characters."
                        )
                        .required("Collaborator is required"),
                    name: Yup.string()
                        .min(3, "Name must be at least 3 characters.")
                        .required("Name is required"),
                    lastName: Yup.string()
                        .min(3, "Last name must be at least 3 characters.")
                        .required("Last name is required"),
                    department: Yup.string().required("Department is required"),
                    country: Yup.string().required("Country is required"),
                    stateProvince: Yup.string().required(
                        "State/Province is required"
                    ),
                    phone: Yup.number()
                        .positive()
                        .integer()
                        .required("Phone is required"),
                    email: Yup.string()
                        .email("Please enter a valid email")
                        .required("Please enter a valid email"),
                })}
                onSubmit={(values) => {
                    // props.login(values)
                    if (!errorUpload) {
                        toast.success("Upload Success");
                        console.log(values);
                    }
                }}
            >
                <Form className="text-center">
                    <h1 className="text-deep-saffron py-4 ">
                        New User Information
                    </h1>

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
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="collaboratorNumber" />
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
                                    htmlFor="lastName"
                                >
                                    Last Name
                                </label>
                                <Field
                                    name="lastName"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="lastName" />
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
                                    htmlFor="country"
                                >
                                    Country
                                </label>
                                <Field
                                    name="country"
                                    className="form-control"
                                    as="select"
                                    required
                                >
                                    <option defaultValue>
                                        Select your Country
                                    </option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </Field>
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="country" />
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
                                    as="select"
                                    required
                                >
                                    <option defaultValue>
                                        Select a State or Province
                                    </option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </Field>
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="stateProvince" />
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
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="phone" />
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
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-8">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-2"
                                    htmlFor="files"
                                >
                                    Upload Photo
                                </label>
                                <input
                                    type="file"
                                    id="files"
                                    onChange={filesSelectedHandler}
                                    className="form-control"
                                />
                            </div>
                            {!errorUpload ? (
                                <></>
                            ) : (
                                <div className="text-danger error-validation p-0 text-start">
                                    {errorUpload}
                                </div>
                            )}
                        </div>
                        <ToastContainer />
                    </div>
                    <div className="d-flex justify-content-start mt-3">
                        <button
                            type="submit"
                            className="btn btn-primary col-lg-1 col-md-2 me-3"
                            onClick={onSubmitFiles}
                        >
                            Save
                        </button>
                        <Link
                            role="button"
                            to="/home/users"
                            className="btn btn-danger col-lg-1 col-md-2"
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

export default NewUser;
