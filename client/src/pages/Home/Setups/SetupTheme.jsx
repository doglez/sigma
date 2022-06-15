import React from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetupTheme = () => {
    return (
        <div className="container">
            <Formik
                initialValues={{
                    lenguage: "en",
                    colorTheme: "dark",
                }}
                onSubmit={(values) => {
                    // props.login(values)
                    toast.success("Upload Success");
                    console.log(values);
                }}
            >
                <Form className="text-center">
                    <h1 className="text-deep-saffron py-4 ">Theme Setup</h1>

                    <div className="row">
                        <div className="col-md-6 col-lg-4 pb-3">
                            <div className="input-group">
                                <label
                                    className="input-group-text col-5"
                                    htmlFor="lenguage"
                                >
                                    Lenguage
                                </label>
                                <Field
                                    name="lenguage"
                                    className="form-control"
                                    as="select"
                                >
                                    <option defaultValue value="en">
                                        English
                                    </option>
                                    <option value="es">Spanish</option>
                                </Field>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 pb-3 d-flex justify-content-between ">
                            <span
                                className="input-group-text col-5"
                                id="my-radio-group"
                            >
                                Color Theme
                            </span>

                            <div className="border border-dark rounded bg-dark text-light px-3 pt-1">
                                <Field
                                    className="form-check-input "
                                    type="radio"
                                    name="colorTheme"
                                    id="dark"
                                    value="dark"
                                />
                                <label
                                    className="form-check-label ps-2"
                                    htmlFor="dark"
                                >
                                    Dark
                                </label>
                            </div>
                            <div className="border rounded px-3 pt-1">
                                <Field
                                    className="form-check-input"
                                    type="radio"
                                    name="colorTheme"
                                    id="light"
                                    value="light"
                                />
                                <label
                                    className="form-check-label ps-2 "
                                    htmlFor="light"
                                >
                                    Light
                                </label>
                            </div>
                        </div>

                        <ToastContainer />
                    </div>
                    <div className="d-flex justify-content-start">
                        <button type="submit" className="btn btn-primary col-2">
                            Save
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default SetupTheme;
