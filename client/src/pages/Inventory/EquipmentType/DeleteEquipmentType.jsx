import { Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const DeleteEquipmentType = () => {
    return (
        <div className="container">
            <Formik
                initialValues={{
                    name: "Servers",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum vel perferendis cumque recusandae",
                }}
                onSubmit={(values) => {
                    // props.login(values)
                    toast.success("Successfully deleted");
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
                        <ToastContainer />
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
        </div>
    );
};

export default DeleteEquipmentType;
