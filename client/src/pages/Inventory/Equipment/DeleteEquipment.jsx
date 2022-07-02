/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteEquipmentCrt,
    getEquipmentCrt,
} from "../../../redux/reducers/equipmentReducers/equipmentSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";

const DeleteEquipment = () => {
    let navigate = useNavigate();
    const equipmentId = window.location.pathname.split("/")[3];

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(getEquipmentCrt(equipmentId));
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const equipment = useSelector((state) => state.equipmentReducer);

    return (
        <div className="container">
            {!equipment.name ? (
                <LoadinEffect />
            ) : (
                <Formik
                    initialValues={{
                        inventoryNumber: equipment.inventoryNumber,
                        name: equipment.name,
                        brand: equipment.brand,
                        model: equipment.model,
                        serial: equipment.serial,
                        equipmentType: equipment.equipmentType,
                        provider: equipment.provider,
                        department: equipment.department,
                        installDate: equipment.installDate.split("T")[0],
                        usableLife: equipment.usableLife,
                    }}
                    onSubmit={() => {
                        dispatch(deleteEquipmentCrt(equipmentId));
                        navigate("../", { replace: true });
                    }}
                >
                    <Form className="text-center">
                        <h1 className="text-danger pt-4 ">
                            Warning you are going to delete the Equipment{" "}
                            {equipment.name} inventory number{" "}
                            {equipment.inventoryNumber}
                        </h1>
                        <h5 className="text-danger pb-4">
                            This change is irreversible.
                        </h5>

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
                                        Equipment Name
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
                                        htmlFor="brand"
                                    >
                                        Brand
                                    </label>
                                    <Field
                                        name="brand"
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
                                        htmlFor="model"
                                    >
                                        Model
                                    </label>
                                    <Field
                                        name="model"
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
                                        htmlFor="serial"
                                    >
                                        Serial #
                                    </label>
                                    <Field
                                        name="serial"
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
                                        htmlFor="equipmentType"
                                    >
                                        Equipment Type
                                    </label>
                                    <Field
                                        name="equipmentType"
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
                                        htmlFor="provider"
                                    >
                                        Provider
                                    </label>
                                    <Field
                                        name="provider"
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
                                        htmlFor="department"
                                    >
                                        Department
                                    </label>
                                    <Field
                                        name="department"
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
                                        htmlFor="installDate"
                                    >
                                        Install Date
                                    </label>
                                    <Field
                                        name="installDate"
                                        className="form-control"
                                        type="date"
                                        required
                                        disabled
                                    />
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
                                        disabled
                                    >
                                        <option value="12">12 months</option>
                                        <option value="24">24 months</option>
                                        <option value="36">36 months</option>
                                        <option value="60">60 months</option>
                                        <option value="120">120 months</option>
                                    </Field>
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
                                to="/inventory"
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

export default DeleteEquipment;
