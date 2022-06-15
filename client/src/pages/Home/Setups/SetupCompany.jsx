import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetupCompany = () => {
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
            formData.append("file", selectedFile, "logo-company.png");

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
                    name: "",
                    address: "",
                    zipCode: "",
                    country: "",
                    stateProvince: "",
                    currency: "",
                    phone: "",
                    email: "",
                    website: "",
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(3, "Name must be at least 3 characters.")
                        .required("Name is required"),
                    address: Yup.string()
                        .min(3, "Address must be at least 3 characters.")
                        .required("Address is required"),
                    zipCode: Yup.string()
                        .min(3, "Zip Code must be at least 3 characters.")
                        .required("Zip Code is required"),
                    country: Yup.string().required("Country is required"),
                    stateProvince: Yup.string().required(
                        "State/Province is required"
                    ),
                    currency: Yup.string().required("Currency is required"),
                    phone: Yup.number()
                        .positive()
                        .integer()
                        .required("Phone is required"),
                    email: Yup.string()
                        .email("Please enter a valid email")
                        .required("Please enter a valid email"),
                    website: Yup.string()
                        .url("Please enter a valid url")
                        .required("Website is required"),
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
                        Company Information
                    </h1>

                    <div className="row">
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
                                    htmlFor="address"
                                >
                                    Address
                                </label>
                                <Field
                                    name="address"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="address" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="zipCode"
                                >
                                    Zip Code
                                </label>
                                <Field
                                    name="zipCode"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="zipCode" />
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
                                        Select your Coutry
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
                                    htmlFor="currency"
                                >
                                    Currency
                                </label>
                                <Field
                                    name="currency"
                                    className="form-control"
                                    as="select"
                                    required
                                >
                                    <option defaultValue>
                                        Select your Currency
                                    </option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </Field>
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="currency" />
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
                                    required
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="email" />
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
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="website" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-8">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-2"
                                    htmlFor="files"
                                >
                                    Upload Logo
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
                    <div className="d-flex justify-content-start">
                        <button
                            type="submit"
                            className="btn btn-primary mt-3 col-2"
                            onClick={onSubmitFiles}
                        >
                            Save
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default SetupCompany;
