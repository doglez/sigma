import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createEquipmentTypeCrt } from "../../../redux/reducers/equipmentTypeReducers/equipmentTypeSlice.js";

const NewEquipmentType = () => {
    let navigate = useNavigate();

    const dispatch = useDispatch();

    return (
        <div className="container">
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(3, "Name must be at least 3 characters.")
                        .max(25, "Name can not be more than 25 characters.")
                        .required("Name is required"),
                    description: Yup.string()
                        .min(10, "Description must be at least 10 characters.")
                        .max(
                            200,
                            "Description can not be more than 200 characters."
                        )
                        .required("Description is required"),
                })}
                onSubmit={(values) => {
                    dispatch(createEquipmentTypeCrt(values));
                    navigate("../", { replace: true });
                }}
            >
                <Form className="text-center">
                    <h1 className="text-deep-saffron py-4 ">
                        New Equipment Type
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
        </div>
    );
};

export default NewEquipmentType;
