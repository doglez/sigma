/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CountriesCrt } from "../../../redux/reducers/countriesSlice.js";
import { StatesProvincesCrt } from "../../../redux/reducers/statesProvincesSlice.js";
import { createUserCrt } from "../../../redux/reducers/usersReducers/userSlice.js";
import { getDepartmentsCrt } from "../../../redux/reducers/departmentsReducers/departmentsSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";

const NewUser = () => {
    let navigate = useNavigate();

    const myRole = useSelector((state) => state.myInfoReducer.role);

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(CountriesCrt());
        dispatch(StatesProvincesCrt());
        dispatch(getDepartmentsCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const countries = useSelector((state) => state.countriesReducer.countries);
    const statesProvinces = useSelector(
        (state) => state.statesProvincesReducer.statesProvinces
    );
    const departments = useSelector((state) => state.departmentsReducer.data);

    return (
        <div className="container">
            {!departments[0] || !countries[0] || !statesProvinces[0] ? (
                <LoadinEffect />
            ) : (
                <Formik
                    initialValues={{
                        collaboratorNumber: "",
                        name: "",
                        lastName: "",
                        department: "",
                        country: "",
                        stateProvince: "",
                        phone: "",
                        email: "",
                        role: "engineer",
                    }}
                    validationSchema={Yup.object({
                        collaboratorNumber: Yup.string()
                            .min(
                                3,
                                "Collaborator number must be at least 3 characters."
                            )
                            .required("Collaborator is required"),
                        name: Yup.string()
                            .min(3, "Name must be at least 3 characters.")
                            .required("Name is required"),
                        lastName: Yup.string()
                            .min(3, "Last name must be at least 3 characters.")
                            .required("Last name is required"),
                        department: Yup.string().required(
                            "Department is required"
                        ),
                        country: Yup.string().required("Country is required"),
                        stateProvince: Yup.string().required(
                            "State/Province is required"
                        ),
                        phone: Yup.number()
                            .positive()
                            .integer()
                            .required("Phone is required"),
                        email: Yup.string()
                            .email("Please enter a valid email")
                            .required("Please enter a valid email"),
                    })}
                    onSubmit={(values) => {
                        dispatch(createUserCrt(values));
                        navigate("../", { replace: true });
                    }}
                >
                    <Form className="text-center">
                        <h1 className="text-deep-saffron py-4 ">
                            New User Information
                        </h1>

                        <div className="row">
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="collaboratorNumber"
                                    >
                                        Collaborator #
                                    </label>
                                    <Field
                                        name="collaboratorNumber"
                                        className="form-control"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="collaboratorNumber" />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
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
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="lastName"
                                    >
                                        Last Name
                                    </label>
                                    <Field
                                        name="lastName"
                                        className="form-control"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="lastName" />
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
                                            Select your Department
                                        </option>
                                        {departments.map((department) => (
                                            <option
                                                value={department._id}
                                                key={department.id}
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
                                        htmlFor="country"
                                    >
                                        Country
                                    </label>
                                    <Field
                                        name="country"
                                        className="form-control"
                                        as="select"
                                    >
                                        <option defaultValue value="">
                                            Select your Contry
                                        </option>
                                        {countries.map((country) => (
                                            <option
                                                value={country.name}
                                                key={country.id}
                                            >
                                                {country.name}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="country" />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="stateProvince"
                                    >
                                        State/Province
                                    </label>
                                    <Field
                                        name="stateProvince"
                                        className="form-control"
                                        as="select"
                                    >
                                        <option defaultValue value="">
                                            Select your State or Province
                                        </option>
                                        {statesProvinces.map(
                                            (stateProvince) => (
                                                <option
                                                    value={stateProvince.name}
                                                    key={stateProvince.id}
                                                >
                                                    {stateProvince.name}
                                                </option>
                                            )
                                        )}
                                    </Field>
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="stateProvince" />
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="phone"
                                    >
                                        Phone
                                    </label>
                                    <Field
                                        name="phone"
                                        className="form-control"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="phone" />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <Field
                                        name="email"
                                        className="form-control"
                                        type="email"
                                        required
                                    />
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="role"
                                    >
                                        Role
                                    </label>
                                    <Field
                                        name="role"
                                        className="form-control"
                                        as="select"
                                        required
                                    >
                                        <option defaultValue value="engineer">
                                            Engineer
                                        </option>
                                        {myRole !== "super-admin" ? (
                                            <></>
                                        ) : (
                                            <option value="admin">Admin</option>
                                        )}
                                        <option value="auditor">Auditor</option>
                                        <option value="chief">Chief</option>
                                        <option value="supervisor">
                                            Supervisor
                                        </option>
                                        {myRole !== "super-admin" ? (
                                            <></>
                                        ) : (
                                            <option value="super-admin">
                                                Super Admin
                                            </option>
                                        )}
                                    </Field>
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
                                to="/home/users"
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

export default NewUser;
