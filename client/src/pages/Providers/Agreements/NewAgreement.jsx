/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProvidersCrt } from "../../../redux/reducers/providersReducers/providersSlice.js";
import { getDepartmentsCrt } from "../../../redux/reducers/departmentsReducers/departmentsSlice.js";
import { getEquipmentsCrt } from "../../../redux/reducers/equipmentReducers/equipmentsSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";
import { createAgreementCrt } from "../../../redux/reducers/agreementReducers/agreementSlice.js";

const NewAgreement = () => {
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(getProvidersCrt());
        dispatch(getDepartmentsCrt());
        dispatch(getEquipmentsCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const providers = useSelector((state) => state.providersReducer.data);
    const departments = useSelector((state) => state.departmentsReducer.data);
    const equipments = useSelector((state) => state.equipmentsReducer.data);

    let now = new Date();
    let duedate = new Date(now);
    let nextYear = new Date(duedate.setDate(now.getDate() + 365));
    nextYear = nextYear.toISOString();

    return (
        <div className="container">
            {!providers[0] || !departments[0] || !equipments[0] ? (
                <LoadinEffect />
            ) : (
                <Formik
                    initialValues={{
                        agreementNumber: "",
                        reference: "",
                        provider: "",
                        department: "",
                        startDate: new Date().toISOString().split("T")[0],
                        expDate: nextYear.split("T")[0],
                        equipments: [],
                    }}
                    validationSchema={Yup.object({
                        agreementNumber: Yup.string()
                            .min(
                                3,
                                "Agreement Number must be at least 3 characters."
                            )
                            .max(
                                15,
                                "Agreement number can not be more than 15 characters."
                            )
                            .required("Agreement Number is required"),
                        reference: Yup.string()
                            .min(3, "Reference must be at least 3 characters.")
                            .max(
                                50,
                                "Reference can not be more than 50 characters."
                            )
                            .required("Reference is required"),
                        provider: Yup.string().required("Provider is required"),
                        department: Yup.string().required(
                            "Department is required"
                        ),
                        startDate: Yup.date().required(
                            "Start Date is required"
                        ),
                        expDate: Yup.date().required(
                            "Expiration Date is required"
                        ),
                        equipments: Yup.array().required(
                            "Equipments are required"
                        ),
                    })}
                    onSubmit={(values) => {
                        dispatch(createAgreementCrt(values));
                        navigate("../", { replace: true });
                    }}
                >
                    <Form className="text-center">
                        <h1 className="text-deep-saffron py-4 ">
                            New Agreement
                        </h1>

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
                                        <option defaultValue value="">
                                            Select a provider
                                        </option>
                                        {providers.map((provider) => (
                                            <option
                                                value={provider._id}
                                                key={provider._id}
                                            >
                                                {provider.name}
                                            </option>
                                        ))}
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
                                        <option defaultValue value="">
                                            Select a department
                                        </option>
                                        {departments.map((department) => (
                                            <option
                                                value={department._id}
                                                key={department._id}
                                            >
                                                {department.name}
                                            </option>
                                        ))}
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
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <div
                                        className="input-group-text col-5"
                                        id="checkbox-group"
                                    >
                                        Equipments
                                    </div>
                                    <div
                                        className="form-control scrollable-vertical"
                                        role="group"
                                        aria-labelledby="checkbox-group"
                                    >
                                        {equipments.map((equipment) => (
                                            <div
                                                className="form-check"
                                                key={equipment._id}
                                            >
                                                <Field
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="equipments"
                                                    value={equipment._id}
                                                />
                                                <label
                                                    className="form-check-label d-flex justify-content-start"
                                                    htmlFor="server1"
                                                >
                                                    {equipment.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-start">
                            <button
                                type="submit"
                                className="btn btn-primary col-lg-1 col-md-2 me-3"
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
            )}
        </div>
    );
};

export default NewAgreement;
