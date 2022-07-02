/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteAgreementCrt,
    getAgreementCrt,
} from "../../../redux/reducers/agreementReducers/agreementSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";
import { getProvidersCrt } from "../../../redux/reducers/providersReducers/providersSlice.js";
import { getDepartmentsCrt } from "../../../redux/reducers/departmentsReducers/departmentsSlice.js";
import { getEquipmentsCrt } from "../../../redux/reducers/equipmentReducers/equipmentsSlice.js";

const DeleteAgreement = () => {
    let navigate = useNavigate();
    const agreementId = window.location.pathname.split("/")[4];

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(getProvidersCrt());
        dispatch(getDepartmentsCrt());
        dispatch(getEquipmentsCrt());
        dispatch(getAgreementCrt(agreementId));
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const providers = useSelector((state) => state.providersReducer.data);
    const departments = useSelector((state) => state.departmentsReducer.data);
    const equipments = useSelector((state) => state.equipmentsReducer.data);
    const agreement = useSelector((state) => state.agreementReducer);

    return (
        <div className="container">
            {!agreement.reference ? (
                <LoadinEffect />
            ) : (
                <Formik
                    initialValues={{
                        agreementNumber: agreement.agreementNumber,
                        reference: agreement.reference,
                        provider: agreement.provider,
                        department: agreement.department,
                        startDate: agreement.startDate.split("T")[0],
                        expDate: agreement.expDate.split("T")[0],
                        equipments: agreement.equipments[0],
                    }}
                    onSubmit={() => {
                        dispatch(deleteAgreementCrt(agreementId));
                        navigate("../", { replace: true });
                    }}
                >
                    <Form className="text-center">
                        <h1 className="text-danger pt-4 ">
                            Warning you are going to delete the agreement{" "}
                            {agreement.reference}
                        </h1>
                        <h5 className="text-danger pb-4">
                            This change is irreversible.
                        </h5>

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
                                        disabled
                                    />
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
                                        disabled
                                    >
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
                                        htmlFor="reference"
                                    >
                                        Reference
                                    </label>
                                    <Field
                                        name="reference"
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
                                        htmlFor="startDate"
                                    >
                                        Start Date
                                    </label>
                                    <Field
                                        name="startDate"
                                        className="form-control"
                                        type="date"
                                        disabled
                                    />
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
                                        disabled
                                    />
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
                                                    disabled
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
                            <div className="d-flex justify-content-start">
                                <button
                                    type="submit"
                                    className="btn btn-danger col-lg-1 col-md-2 me-3"
                                >
                                    Delete
                                </button>
                                <Link
                                    role="button"
                                    to="/providers/agreements"
                                    className="btn btn-secondary col-lg-1 col-md-2"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </Form>
                </Formik>
            )}
        </div>
    );
};

export default DeleteAgreement;
