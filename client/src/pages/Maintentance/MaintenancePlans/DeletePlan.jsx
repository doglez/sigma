/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsCrt } from "../../../redux/reducers/departmentsReducers/departmentsSlice.js";
import { getAgreementsCrt } from "../../../redux/reducers/agreementReducers/agreementsSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";
import {
    deleteMaintenancePlanCrt,
    getMaintenancePlanCrt,
} from "../../../redux/reducers/maintenancePlanReducers/maintenancePlanSlice.js";

const DeletePlan = () => {
    let navigate = useNavigate();
    const maintenancePlanId = window.location.pathname.split("/")[3];

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(getDepartmentsCrt());
        dispatch(getAgreementsCrt());
        dispatch(getMaintenancePlanCrt(maintenancePlanId));
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const departments = useSelector((state) => state.departmentsReducer.data);
    const agreements = useSelector((state) => state.agreementsReducer.data);
    const maintenancePlan = useSelector(
        (state) => state.maintenancePlanReducer
    );

    return (
        <div className="container">
            {!agreements[0] || !departments[0] || !maintenancePlan.name ? (
                <LoadinEffect />
            ) : (
                <Formik
                    initialValues={{
                        year: maintenancePlan.year,
                        name: maintenancePlan.name,
                        department: maintenancePlan.department,
                        frequency: maintenancePlan.frequency,
                        agreements: maintenancePlan.agreements,
                    }}
                    onSubmit={() => {
                        dispatch(deleteMaintenancePlanCrt(maintenancePlanId));
                        navigate("../", { replace: true });
                    }}
                >
                    <Form className="text-center">
                        <h1 className="text-deep-saffron py-4 ">
                            Edit {maintenancePlan.name}
                        </h1>

                        <div className="row">
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="year"
                                    >
                                        Year
                                    </label>
                                    <Field
                                        className="form-control"
                                        name="year"
                                        type="number"
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
                                        as="select"
                                        disabled
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
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="frequency"
                                    >
                                        Times a Year
                                    </label>
                                    <Field
                                        name="frequency"
                                        className="form-control"
                                        as="select"
                                        disabled
                                    >
                                        <option value={1}>Once a year</option>
                                        <option value={2}>Twice a year</option>
                                        <option value={4}>
                                            4 times a year
                                        </option>
                                        <option value={6}>
                                            6 times a year
                                        </option>
                                        <option value={12}>
                                            12 times a year
                                        </option>
                                    </Field>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-8 pb-3">
                                <div className="input-group">
                                    <div
                                        className="input-group-text col-3"
                                        id="checkbox-group"
                                    >
                                        Agreements
                                    </div>
                                    <div
                                        className="form-control scrollable-vertical"
                                        role="group"
                                        aria-labelledby="checkbox-group"
                                    >
                                        {agreements.map((agreement) => (
                                            <div
                                                className="form-check"
                                                key={agreement._id}
                                            >
                                                <Field
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="agreements"
                                                    value={agreement._id}
                                                    disabled
                                                />
                                                <label
                                                    className="form-check-label d-flex justify-content-start"
                                                    htmlFor="server1"
                                                >
                                                    {agreement.reference}
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
                                className="btn btn-danger col-lg-1 col-md-2 me-3"
                            >
                                Save
                            </button>
                            <Link
                                role="button"
                                to="/maintenance"
                                className="btn btn-secondary col-lg-1 col-md-2"
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

export default DeletePlan;
