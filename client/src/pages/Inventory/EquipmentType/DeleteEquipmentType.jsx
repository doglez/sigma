/* eslint-disable react-hooks/exhaustive-deps */
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    deleteEquipmentTypeCrt,
    getEquipmentTypeCrt,
} from "../../../redux/reducers/equipmentType/equipmentTypeSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";

const DeleteEquipmentType = () => {
    let navigate = useNavigate();
    const equipmentTypeId = window.location.pathname.split("/")[4];

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(getEquipmentTypeCrt(equipmentTypeId));
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const equipmentType = useSelector((state) => state.equipmentTypeReducer);

    return (
        <div className="container">
            {!equipmentType.name ? (
                <LoadinEffect />
            ) : (
                <Formik
                    initialValues={{
                        name: equipmentType.name,
                        description: equipmentType.description,
                    }}
                    onSubmit={(values) => {
                        dispatch(deleteEquipmentTypeCrt(equipmentTypeId));
                        navigate("../", { replace: true });
                    }}
                >
                    <Form className="text-center">
                        <h1 className="text-danger pt-4 ">
                            Warning you are going to delete the Equipment Type{" "}
                            {equipmentType.name}
                        </h1>
                        <h5 className="text-danger pb-4">
                            This change is irreversible.
                        </h5>

                        <div className="row">
                            <div className="col-md-6 col-lg-4">
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
                            <div className="col-6 ">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="description"
                                    >
                                        Description
                                    </label>
                                    <Field
                                        name="description"
                                        className="form-control"
                                        type="text"
                                        required
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-start mt-3">
                            <button
                                type="submit"
                                className="btn btn-danger col-lg-1 col-md-2 me-3"
                            >
                                Save
                            </button>
                            <Link
                                role="button"
                                to="/inventory/typelist"
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

export default DeleteEquipmentType;
