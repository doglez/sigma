/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CountriesCrt } from "../../../redux/reducers/countriesSlice.js";
import { createProviderCrt } from "../../../redux/reducers/providersReducers/providerSlice.js";

const NewProvider = () => {
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(CountriesCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const countries = useSelector((state) => state.countriesReducer.countries);

    return (
        <div className="container">
            {!countries[0] ? (
                <div>Your Data is loading...</div>
            ) : (
                <Formik
                    initialValues={{
                        ein: "",
                        name: "",
                        country: "",
                        phone: "",
                        email: "",
                        website: "",
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
                        country: Yup.string().required("Country is required"),
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
                        dispatch(createProviderCrt(values));
                        navigate("../", { replace: true });
                    }}
                >
                    <Form className="text-center">
                        <h1 className="text-deep-saffron py-4 ">
                            Provider Information
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
                                        <option defaultValue value="">
                                            Select your Contry
                                        </option>
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
                        </div>
                        <div className="d-flex justify-content-start">
                            <button
                                type="submit"
                                className="btn btn-primary mt-3 col-2"
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

export default NewProvider;
