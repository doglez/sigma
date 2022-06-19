import React from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const DeleteEquipment = () => {
    return (
        <div className="container">
            <Formik
                initialValues={{
                    inventoryNumber: "234Aaer",
                    equipmentName: "SERVER-DELL-50TB",
                    provider: "Doglez Inc.",
                    department: "Data Center",
                    installDate: "2020-06-18",
                    usableLife: "60",
                }}
                onSubmit={(values) => {
                    // props.login(values)
                    toast.success("Successfully deleted");
                    console.log(values);
                }}
            >
                <Form className="text-center">
                    <h1 className="text-deep-saffron py-4 ">Edit Inventory</h1>

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
                                    htmlFor="equipmentName"
                                >
                                    Equipment Name
                                </label>
                                <Field
                                    name="equipmentName"
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
                        <ToastContainer />
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
        </div>
    );
};

export default DeleteEquipment;
