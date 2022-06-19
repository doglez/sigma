import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewEquipment = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [errorUpload, setErrorUpload] = useState();

    const filesSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setErrorUpload();
    };

    const onSubmitFiles = () => {
        const formData = new FormData();

        if (!selectedFile) {
            setErrorUpload("You need to provide a invoice");
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
                    inventoryNumber: "",
                    equipmentName: "",
                    provider: "",
                    department: "",
                    installDate: new Date().toISOString().split("T")[0],
                    usableLife: "60",
                }}
                validationSchema={Yup.object({
                    inventoryNumber: Yup.string()
                        .min(
                            3,
                            "Inventory Number must be at least 3 characters."
                        )
                        .required("Inventory Number is required"),
                    equipmentName: Yup.string()
                        .min(3, "Equipment Name must be at least 3 characters.")
                        .required("Equipment Name is required"),
                    provider: Yup.string().required("Provider is required"),
                    department: Yup.string().required("Department is required"),
                    installDate: Yup.date().required(
                        "Install Date is required"
                    ),
                    usableLife: Yup.date().required("Usable Life  is required"),
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
                    <h1 className="text-deep-saffron py-4 ">New Inventory</h1>

                    <div className="row">
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="inventoryNumber"
                                >
                                    Inventory #
                                </label>
                                <Field
                                    name="inventoryNumber"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="inventoryNumber" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="equipmentName"
                                >
                                    Equipment Name
                                </label>
                                <Field
                                    name="equipmentName"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="equipmentName" />
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
                                        Select a department
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
                                    htmlFor="installDate"
                                >
                                    Install Date
                                </label>
                                <Field
                                    name="installDate"
                                    className="form-control"
                                    type="date"
                                    required
                                />
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="installDate" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="usableLife"
                                >
                                    Usable Life
                                </label>
                                <Field
                                    name="usableLife"
                                    className="form-control"
                                    as="select"
                                    required
                                >
                                    <option value="12">12 months</option>
                                    <option value="24">24 months</option>
                                    <option value="36">36 months</option>
                                    <option value="60">60 months</option>
                                    <option value="120">120 months</option>
                                </Field>
                            </div>
                            <div className="text-danger error-validation p-0 text-start">
                                <ErrorMessage name="usableLife" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-8">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-2"
                                    htmlFor="files"
                                >
                                    Upload Invoice
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

export default NewEquipment;
