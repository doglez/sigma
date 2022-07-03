/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDepartmentsCrt } from "../../../redux/reducers/departmentsReducers/departmentsSlice.js";
import { getEquipmentsCrt } from "../../../redux/reducers/equipmentReducers/equipmentsSlice.js";
import { getUsersCrt } from "../../../redux/reducers/usersReducers/usersSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";
import { createTaskCrt } from "../../../redux/reducers/tasksReducers/taskSlice.js";

const NewTask = () => {
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(getDepartmentsCrt());
        dispatch(getEquipmentsCrt());
        dispatch(getUsersCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const departments = useSelector((state) => state.departmentsReducer.data);
    const equipments = useSelector((state) => state.equipmentsReducer.data);
    const users = useSelector((state) => state.usersReducer.data);

    return (
        <div className="container">
            {!users[0] || !departments[0] || !equipments[0] ? (
                <LoadinEffect />
            ) : (
                <Formik
                    initialValues={{
                        type: "cm",
                        department: "",
                        user: "",
                        equipment: "",
                    }}
                    validationSchema={Yup.object({
                        type: Yup.string().required("Type of task is required"),
                        department: Yup.string().required(
                            "Department is required"
                        ),
                        user: Yup.string(),
                        equipment: Yup.string().required(
                            "Equipment is required"
                        ),
                    })}
                    onSubmit={(values) => {
                        dispatch(createTaskCrt(values));
                        navigate("../", { replace: true });
                    }}
                >
                    <Form className="text-center">
                        <h1 className="text-deep-saffron py-4 ">New Task</h1>

                        <div className="row">
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="type"
                                    >
                                        Type
                                    </label>
                                    <Field
                                        name="type"
                                        className="form-control"
                                        as="select"
                                        required
                                    >
                                        <option value="cm">
                                            Corrective maintenance
                                        </option>
                                        <option value="pm">
                                            Preventive maintenance
                                        </option>
                                    </Field>
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="type" />
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
                                        htmlFor="user"
                                    >
                                        User
                                    </label>
                                    <Field
                                        name="user"
                                        className="form-control"
                                        as="select"
                                        required
                                    >
                                        <option defaultValue value="">
                                            Select a user
                                        </option>
                                        {users.map((user) => (
                                            <option
                                                value={user._id}
                                                key={user._id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="user" />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 pb-3">
                                <div className="input-group">
                                    <label
                                        className="input-group-text col-5"
                                        htmlFor="equipment"
                                    >
                                        Equipment
                                    </label>
                                    <Field
                                        name="equipment"
                                        className="form-control"
                                        as="select"
                                        required
                                    >
                                        <option defaultValue value="">
                                            Select a equipment type
                                        </option>
                                        {equipments.map((equipment) => (
                                            <option
                                                value={equipment._id}
                                                key={equipment._id}
                                            >
                                                {equipment.name}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="text-danger error-validation p-0 text-start">
                                    <ErrorMessage name="equipment" />
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
                                to="/maintenance/tasks"
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

export default NewTask;
