/* eslint-disable react-hooks/exhaustive-deps */
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDepartmentsCrt } from "../../../redux/reducers/departmentsReducers/departmentsSlice.js";
import { getEquipmentsCrt } from "../../../redux/reducers/equipmentReducers/equipmentsSlice.js";
import {
    deleteTaskCrt,
    getTaskCrt,
} from "../../../redux/reducers/tasksReducers/taskSlice.js";
import { getUsersCrt } from "../../../redux/reducers/usersReducers/usersSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";

const DeleteTask = () => {
    let navigate = useNavigate();
    const taskId = window.location.pathname.split("/")[4];

    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(getDepartmentsCrt());
        dispatch(getEquipmentsCrt());
        dispatch(getUsersCrt());
        dispatch(getTaskCrt(taskId));
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const departments = useSelector((state) => state.departmentsReducer.data);
    const equipments = useSelector((state) => state.equipmentsReducer.data);
    const users = useSelector((state) => state.usersReducer.data);
    const task = useSelector((state) => state.taskReducer);

    let attachFiles = task.files;

    return (
        <div>
            <div className="container">
                {!users[0] ||
                !departments[0] ||
                !equipments[0] ||
                !task.taskNumber ? (
                    <LoadinEffect />
                ) : (
                    <>
                        <Formik
                            initialValues={{
                                type: task.type,
                                department: task.department,
                                user: task.user,
                                equipment: task.equipment,
                                status: "cancel",
                            }}
                            onSubmit={(values) => {
                                dispatch(deleteTaskCrt(taskId, values));
                                navigate("../", { replace: true });
                            }}
                        >
                            <Form className="text-center">
                                <h1 className="text-danger pt-4 ">
                                    Warning you are going to delete the task{" "}
                                    {task.taskNumber}
                                </h1>
                                <h5 className="text-danger pb-4">
                                    This change is irreversible.
                                </h5>

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
                                                disabled
                                            >
                                                <option value="cm">
                                                    Corrective maintenance
                                                </option>
                                                <option value="pm">
                                                    Preventive maintenance
                                                </option>
                                            </Field>
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
                                                disabled
                                            >
                                                <option defaultValue value="">
                                                    Select a department
                                                </option>
                                                {departments.map(
                                                    (department) => (
                                                        <option
                                                            value={
                                                                department._id
                                                            }
                                                            key={department._id}
                                                        >
                                                            {department.name}
                                                        </option>
                                                    )
                                                )}
                                            </Field>
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
                                                disabled
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
                                                disabled
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
                                    </div>
                                    <div className="col-md-6 col-lg-4 pb-3">
                                        <div className="input-group">
                                            <label
                                                className="input-group-text col-5"
                                                htmlFor="status"
                                            >
                                                Status
                                            </label>
                                            <Field
                                                name="status"
                                                className="form-control"
                                                as="select"
                                                disabled
                                            >
                                                <option value="backlog">
                                                    Backlog
                                                </option>
                                                <option value="in-progress">
                                                    In Progress
                                                </option>
                                                <option value="done">
                                                    Done
                                                </option>
                                                <option value="cancel">
                                                    Cancel
                                                </option>
                                            </Field>
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
                                        to="/maintenance/tasks"
                                        className="btn btn-secondary col-lg-1 col-md-2"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </Form>
                        </Formik>
                        {!attachFiles ? (
                            <></>
                        ) : (
                            attachFiles.map((file) => (
                                <div key={file} className="mt-2">
                                    <a
                                        href={`${process.env.REACT_APP_FILE_URL_SERVER}/tasks/${file}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {task.type}
                                        {task.taskNumber}
                                    </a>
                                    <br />
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default DeleteTask;
