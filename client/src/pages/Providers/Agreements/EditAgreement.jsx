import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const EditAgreement = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [errorUpload, setErrorUpload] = useState();

    const filesSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setErrorUpload();
    };

    const onSubmitFiles = () => {
        const formData = new FormData();

        if (!selectedFile) {
            setErrorUpload("You need to provide a file");
        } else if (selectedFile.size >= 2000000) {
            setErrorUpload("File size must be less than 2MB");
        } else if (selectedFile.type !== "application/pdf") {
            setErrorUpload("Only support PDF");
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
                    agreementNumber: "3ASER",
                    provider: "Doglez Inc.",
                    reference: "Servers & Storage",
                    startDate: "2021-06-17",
                    expDate: "2022-06-16",
                }}
                validationSchema={Yup.object({
                    agreementNumber: Yup.string()
                        .min(
                            3,
                            "Agreement Number must be at least 3 characters."
                        )
                        .required("Agreement Number is required"),
                    provider: Yup.string().required("Provider is required"),
                    reference: Yup.string()
                        .min(3, "Reference must be at least 3 characters.")
                        .required("Reference is required"),
                    startDate: Yup.date().required("Start Date is required"),
                    expDate: Yup.date().required("Expiration Date is required"),
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
                    <h1 className="text-deep-saffron py-4 ">Edit Agreement</h1>

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
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="agreementNumber" />
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
                                >
                                    <option defaultValue>
                                        Select a provider
                                    </option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </Field>
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="provider" />
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
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="reference" />
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
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="startDate" />
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
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="expDate" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-8 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-2"
                                    htmlFor="files"
                                >
                                    Upload File
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
                            className="btn btn-primary col-lg-1 col-md-2 me-3"
                            onClick={onSubmitFiles}
                        >
                            Save
                        </button>
                        <Link
                            role="button"
                            to="/providers/agreements"
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

export default EditAgreement;
