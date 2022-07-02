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
import { getProvidersCrt } from "../../../redux/reducers/providersReducers/providersSlice.js";
import { getDepartmentsCrt } from "../../../redux/reducers/departmentsReducers/departmentsSlice.js";
import { getEquipmentsCrt } from "../../../redux/reducers/equipmentReducers/equipmentsSlice.js";
import {
    getAgreementCrt,
    updateAgreementCrt,
} from "../../../redux/reducers/agreementReducers/agreementSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";

const EditAgreement = () => {
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

    let attachFiles = agreement.files[0];

    const [selectedFiles, setSelectedFiles] = useState();
    const [errorUpload, setErrorUpload] = useState();

    const filesSelectedHandler = (e) => {
        setSelectedFiles(e.target.files);
        setErrorUpload();
    };

    const onSubmitFiles = () => {
        const formData = new FormData();
        if (!selectedFiles) {
            return;
        }

        for (let i = 0; i < selectedFiles.length; i++) {
            const selectedFile = selectedFiles[i];

            if (selectedFile.size >= process.env.REACT_APP_MAX_FILE_UPLOAD) {
                setErrorUpload(
                    `File size must be less than ${
                        process.env.REACT_APP_MAX_FILE_UPLOAD / 1000000
                    }MB`
                );
            } else if (selectedFile.type !== "application/pdf") {
                setErrorUpload("Only support PDF");
            } else {
                formData.append("file", selectedFile);
                axios
                    .put(
                        `${process.env.REACT_APP_API_URL_SERVER}/agreements/uploadfiles/${agreementId}`,
                        formData
                    )
                    .then((res) => {
                        setErrorUpload();
                    })
                    .catch((err) => {
                        console.error(err.message);
                        toast.error("Upload Error");
                    });
            }
        }
    };

    return (
        <div className="container">
            {!agreement.reference ||
            !providers[0] ||
            !departments[0] ||
            !equipments[0] ? (
                <LoadinEffect />
            ) : (
                <>
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
                                .min(
                                    3,
                                    "Reference must be at least 3 characters."
                                )
                                .max(
                                    50,
                                    "Reference can not be more than 50 characters."
                                )
                                .required("Reference is required"),
                            provider: Yup.string().required(
                                "Provider is required"
                            ),
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
                            dispatch(updateAgreementCrt(agreementId, values));
                            navigate("../", { replace: true });
                        }}
                    >
                        <Form className="text-center">
                            <h1 className="text-deep-saffron py-4 ">
                                Edit agreement {agreement.reference}
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
                                <div className="col-md-6 col-lg-8">
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
                                            multiple
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
                    {!attachFiles ? (
                        <></>
                    ) : (
                        attachFiles.map((file) => (
                            <div key={file} className="mt-2">
                                <a
                                    href={`${process.env.REACT_APP_FILE_URL_SERVER}/agreements/${file}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {agreement.reference}
                                </a>
                                <br />
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    );
};

export default EditAgreement;
