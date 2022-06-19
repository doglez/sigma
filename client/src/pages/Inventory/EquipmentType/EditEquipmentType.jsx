import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const EditEquipmentType = () => {
    return (
        <div className="container">
            <Formik
                initialValues={{
                    name: "Servers",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum vel perferendis cumque recusandae",
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(3, "Name must be at least 3 characters.")
                        .required("Name is required"),
                    description: Yup.string()
                        .min(3, "Description must be at least 3 characters.")
                        .required("Description is required"),
                })}
                onSubmit={(values) => {
                    // props.login(values)
                    toast.success("Upload Success");
                    console.log(values);
                }}
            >
                <Form className="text-center">
                    <h1 className="text-deep-saffron py-4 ">
                        Edit Equipment Type
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
                        <ToastContainer />
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

export default EditEquipmentType;
