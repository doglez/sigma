/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getEquipmentTypeCrt,
    updateEquipmentTypeCrt,
} from "../../../redux/reducers/equipmentType/equipmentTypeSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";

const EditEquipmentType = () => {
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
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .min(3, "Name must be at least 3 characters.")
                            .max(25, "Name can not be more than 25 characters.")
                            .required("Name is required"),
                        description: Yup.string()
                            .min(
                                10,
                                "Description must be at least 10 characters."
                            )
                            .max(
                                200,
                                "Description can not be more than 200 characters."
                            )
                            .required("Description is required"),
                    })}
                    onSubmit={(values) => {
                        dispatch(
                            updateEquipmentTypeCrt(equipmentTypeId, values)
                        );
                        navigate("../", { replace: true });
                    }}
                >
                    <Form className="text-center">
                        <h1 className="text-deep-saffron py-4 ">
                            Edit Equipment Type {equipmentType.name}
                        </h1>

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
                                    />
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="name" />
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
                                    />
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="description" />
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

export default EditEquipmentType;
