/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
    getCompanyCrt,
    updateCompanyCrt,
} from "../../../redux/reducers/companySlice.js";
import { CountriesCrt } from "../../../redux/reducers/countriesSlice.js";
import { StatesProvincesCrt } from "../../../redux/reducers/statesProvincesSlice.js";

const SetupCompany = () => {
    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(getCompanyCrt());
        dispatch(CountriesCrt());
        dispatch(StatesProvincesCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const countries = useSelector((state) => state.countriesReducer.countries);
    const statesProvinces = useSelector(
        (state) => state.statesProvincesReducer.statesProvinces
    );
    const {
        name,
        address,
        zipCode,
        country,
        stateProvince,
        currency,
        phone,
        email,
        website,
    } = useSelector((state) => state.companyReducer);

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
        } else if (selectedFile.size >= process.env.REACT_APP_MAX_FILE_UPLOAD) {
            setErrorUpload(
                `File size must be less than ${
                    process.env.REACT_APP_MAX_FILE_UPLOAD / 1000000
                }MB`
            );
        } else if (selectedFile.type !== "image/png") {
            setErrorUpload("We only support png");
        } else {
            formData.append("file", selectedFile);

            axios
                .put(
                    `${process.env.REACT_APP_API_URL_SERVER}/company/uploadlogo`,
                    formData
                )
                .then((res) => {
                    setErrorUpload();
                })
                .catch((err) => {
                    // console.error(err.message);
                    toast.error("Upload Logo Error");
                });
        }
    };

    return (
        <div className="container">
            {!name ? (
                <div>Your Data is loading...</div>
            ) : (
                <Formik
                    initialValues={{
                        name: name,
                        address: address,
                        zipCode: zipCode,
                        country: country,
                        stateProvince: stateProvince,
                        currency: currency,
                        phone: phone,
                        email: email,
                        website: website,
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
                            dispatch(updateCompanyCrt(values));
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
                                    >
                                        {statesProvinces.map(
                                            (stateProvince) => (
                                                <option
                                                    value={stateProvince.name}
                                                    key={stateProvince.id}
                                                >
                                                    {stateProvince.name}
                                                </option>
                                            )
                                        )}
                                    </Field>
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
                                    >
                                        <option value={"USD"}>USD</option>
                                        <option value={"EUR"}>EUR</option>
                                    </Field>
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
            )}
        </div>
    );
};

export default SetupCompany;
