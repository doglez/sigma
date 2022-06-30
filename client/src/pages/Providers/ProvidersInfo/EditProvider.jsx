/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CountriesCrt } from "../../../redux/reducers/countriesSlice.js";
import {
    getProviderCrt,
    updateProviderCrt,
} from "../../../redux/reducers/providersReducers/providerSlice.js";
import NoLogo from "../../../assets/images/NoLogo.png";

const EditProvider = () => {
    let navigate = useNavigate();
    const providerId = window.location.pathname.split("/")[3];

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(CountriesCrt());
        dispatch(getProviderCrt(providerId));
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const countries = useSelector((state) => state.countriesReducer.countries);

    const provider = useSelector((state) => state.providerReducer);

    const [selectedFile, setSelectedFile] = useState();
    const [errorUpload, setErrorUpload] = useState();

    const filesSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setErrorUpload();
    };

    const onSubmitFiles = () => {
        const formData = new FormData();

        if (!selectedFile) {
            return;
        } else if (selectedFile.size >= process.env.REACT_APP_MAX_FILE_UPLOAD) {
            setErrorUpload(
                `File size must be less than ${
                    process.env.REACT_APP_MAX_FILE_UPLOAD / 1000000
                }MB`
            );
        } else if (
            selectedFile.type !== "image/png" &&
            selectedFile.type !== "image/jpeg"
        ) {
            setErrorUpload("We only support png or jpeg");
        } else {
            formData.append("file", selectedFile);

            axios
                .put(
                    `${process.env.REACT_APP_API_URL_SERVER}/providers/uploadlogo/${providerId}`,
                    formData
                )
                .then((res) => {
                    setErrorUpload();
                })
                .catch((err) => {
                    console.error(err.message);
                    toast.error("Upload Logo Error");
                });
        }
    };

    return (
        <div className="container">
            {!provider.name || !countries[0] ? (
                <div>Your Data is loading...</div>
            ) : (
                <>
                    <Formik
                        initialValues={{
                            ein: provider.ein,
                            name: provider.name,
                            country: provider.country,
                            phone: provider.phone,
                            email: provider.email,
                            website: provider.website,
                        }}
                        validationSchema={Yup.object({
                            ein: Yup.string()
                                .min(
                                    3,
                                    "Employer Identification Number must be at least 3 characters."
                                )
                                .required(
                                    "Employer Identification Number is required"
                                ),
                            name: Yup.string()
                                .min(3, "Name must be at least 3 characters.")
                                .required("Name is required"),
                            country: Yup.string().required(
                                "Country is required"
                            ),
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
                            if (!errorUpload) {
                                dispatch(updateProviderCrt(providerId, values));
                                navigate("../", { replace: true });
                            }
                        }}
                    >
                        <Form className="text-center">
                            <h1 className="text-deep-saffron py-4 ">
                                Edit Provider {provider.name}
                            </h1>

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
                                    <div className="text-danger error-validation p-0 text-start">
                                        <ErrorMessage name="ein" />
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
                                            {countries.map((country) => (
                                                <option
                                                    value={country.name}
                                                    key={country.id}
                                                >
                                                    {country.name}
                                                </option>
                                            ))}
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
                                    to="/providers"
                                    className="btn btn-danger col-lg-1 col-md-2"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </Form>
                    </Formik>
                    <div className="d-flex justify-content-center">
                        {!provider.logo ? (
                            <img
                                src={NoLogo}
                                className="img-thumbnail mt-3 logo-provider-large"
                                alt="..."
                            />
                        ) : (
                            <img
                                src={`${process.env.REACT_APP_FILE_URL_SERVER}/${provider.logo}`}
                                className="img-thumbnail mt-3 logo-provider-large"
                                alt={provider.name}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default EditProvider;
