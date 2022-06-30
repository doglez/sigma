/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteProviderCrt,
    getProviderCrt,
} from "../../../redux/reducers/providersReducers/providerSlice.js";
import NoLogo from "../../../assets/images/NoLogo.png";

const DeleteProvider = () => {
    let navigate = useNavigate();
    const providerId = window.location.pathname.split("/")[3];

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(getProviderCrt(providerId));
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const provider = useSelector((state) => state.providerReducer);

    return (
        <div className="container">
            {!provider.name ? (
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
                        onSubmit={(values) => {
                            dispatch(deleteProviderCrt(providerId));
                            navigate("../", { replace: true });
                        }}
                    >
                        <Form className="text-center">
                            <h1 className="text-danger pt-4 ">
                                Warning you are going to delete the Provider{" "}
                                {provider.name}
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
                    <div className="d-flex justify-content-center">
                        {!provider.logo ? (
                            <img
                                src={NoLogo}
                                className="mt-3 logo-provider-large"
                                alt="..."
                            />
                        ) : (
                            <img
                                src={`${process.env.REACT_APP_FILE_URL_SERVER}/${provider.logo}`}
                                className="mt-3 logo-provider-large"
                                alt={provider.name}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DeleteProvider;
