/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProvidersCrt } from "../../../redux/reducers/providersReducers/providersSlice.js";
import { getDepartmentsCrt } from "../../../redux/reducers/departmentsReducers/departmentsSlice.js";
import { getEquipmentTypesCrt } from "../../../redux/reducers/equipmentTypeReducers/equipmentTypesSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";
import { createEquipmentCrt } from "../../../redux/reducers/equipmentReducers/equipmentSlice.js";

const NewEquipment = () => {
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(getProvidersCrt());
        dispatch(getDepartmentsCrt());
        dispatch(getEquipmentTypesCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const providers = useSelector((state) => state.providersReducer.data);
    const departments = useSelector((state) => state.departmentsReducer.data);
    const equipmentTypes = useSelector(
        (state) => state.equipmentTypesReducer.data
    );

    return (
        <div className="container">
            {!providers[0] || !departments[0] || !equipmentTypes[0] ? (
                <LoadinEffect />
            ) : (
                <Formik
                    initialValues={{
                        inventoryNumber: "",
                        name: "",
                        brand: "",
                        model: "",
                        serial: "",
                        equipmentType: "",
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
                        name: Yup.string()
                            .min(
                                3,
                                "Equipment Name must be at least 3 characters."
                            )
                            .max(
                                25,
                                "Equipment Name must be at least 25 characters."
                            )
                            .required("Equipment Name is required"),
                        brand: Yup.string()
                            .min(3, "Brand must be at least 3 characters.")
                            .max(25, "Brand must be at least 25 characters.")
                            .required("Brand is required"),
                        model: Yup.string()
                            .min(3, "Model must be at least 3 characters.")
                            .max(15, "Model must be at least 15 characters.")
                            .required("Model is required"),
                        serial: Yup.string()
                            .min(
                                3,
                                "Serial number must be at least 3 characters."
                            )
                            .max(
                                15,
                                "Serial number must be at least 15 characters."
                            )
                            .required("Serial number is required"),
                        equipmentType:
                            Yup.string().required("Type is required"),
                        provider: Yup.string().required("Provider is required"),
                        department: Yup.string().required(
                            "Department is required"
                        ),
                        installDate: Yup.date().required(
                            "Install Date is required"
                        ),
                        usableLife: Yup.date().required(
                            "Usable Life  is required"
                        ),
                    })}
                    onSubmit={(values) => {
                        dispatch(createEquipmentCrt(values));
                        navigate("../", { replace: true });
                    }}
                >
                    <Form className="text-center">
                        <h1 className="text-deep-saffron py-4 ">
                            New Inventory
                        </h1>

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
                                        htmlFor="name"
                                    >
                                        Equipment Name
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
                                        htmlFor="brand"
                                    >
                                        Brand
                                    </label>
                                    <Field
                                        name="brand"
                                        className="form-control"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="brand" />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="model"
                                    >
                                        Model
                                    </label>
                                    <Field
                                        name="model"
                                        className="form-control"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="model" />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="serial"
                                    >
                                        Serial #
                                    </label>
                                    <Field
                                        name="serial"
                                        className="form-control"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="serial" />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="equipmentType"
                                    >
                                        Equipment Type
                                    </label>
                                    <Field
                                        name="equipmentType"
                                        className="form-control"
                                        as="select"
                                        required
                                    >
                                        <option defaultValue value="">
                                            Select a equipment type
                                        </option>
                                        {equipmentTypes.map((equipmentType) => (
                                            <option
                                                value={equipmentType._id}
                                                key={equipmentType._id}
                                            >
                                                {equipmentType.name}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="equipmentType" />
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
                        </div>
                        <div className="d-flex justify-content-start mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary col-lg-1 col-md-2 me-3"
                            >
                                Save
                            </button>
                            <Link
                                role="button"
                                to="/inventory/typelist"
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

export default NewEquipment;
