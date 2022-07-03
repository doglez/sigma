/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { getDepartmentsCrt } from "../../../redux/reducers/departmentsReducers/departmentsSlice.js";
import { getEquipmentsCrt } from "../../../redux/reducers/equipmentReducers/equipmentsSlice.js";
import { getUsersCrt } from "../../../redux/reducers/usersReducers/usersSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";
import {
    getTaskCrt,
    updateTaskCrt,
} from "../../../redux/reducers/tasksReducers/taskSlice.js";
import axios from "axios";

const EditTask = () => {
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

    const [selectedFiles, setSelectedFiles] = useState();
    const [errorUpload, setErrorUpload] = useState();

    const filesSelectedHandler = (e) => {
        setSelectedFiles(e.target.files);
        setErrorUpload();
    };

    const onSubmitFiles = () => {
        const formData = new FormData();

        if (!selectedFiles) {
            return;
        }

        for (let i = 0; i < selectedFiles.length; i++) {
            const selectedFile = selectedFiles[i];

            if (selectedFile.size >= process.env.REACT_APP_MAX_FILE_UPLOAD) {
                setErrorUpload(
                    `File size must be less than ${
                        process.env.REACT_APP_MAX_FILE_UPLOAD / 1000000
                    }MB`
                );
            } else if (
                selectedFile.type !== "application/pdf" &&
                selectedFile.type !== "image/jpeg"
            ) {
                setErrorUpload("Only support PDF");
            } else {
                formData.append("file", selectedFile);
                axios
                    .put(
                        `${process.env.REACT_APP_API_URL_SERVER}/tasks/uploadfiles/${taskId}`,
                        formData
                    )
                    .then((res) => {
                        setErrorUpload();
                    })
                    .catch((err) => {
                        console.error(err.message);
                        toast.error("Upload Error");
                    });
            }
        }
    };

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
                                status: task.status,
                            }}
                            validationSchema={Yup.object({
                                type: Yup.string().required(
                                    "Type of task is required"
                                ),
                                department: Yup.string().required(
                                    "Department is required"
                                ),
                                user: Yup.string(),
                                equipment: Yup.string().required(
                                    "Equipment is required"
                                ),
                            })}
                            onSubmit={(values) => {
                                dispatch(updateTaskCrt(taskId, values));
                                navigate("../", { replace: true });
                            }}
                        >
                            <Form className="text-center">
                                <h1 className="text-deep-saffron py-4 ">
                                    Edit taks {task.taskNumber}
                                </h1>

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
                                                required
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
                                        <div className="text-danger error-validation p-0 text-start">
                                            <ErrorMessage name="status" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-8">
                                        <div className="input-group">
                                            <label
                                                className="input-group-text col-2"
                                                htmlFor="files"
                                            >
                                                Upload File
                                            </label>
                                            <input
                                                type="file"
                                                id="files"
                                                onChange={filesSelectedHandler}
                                                className="form-control"
                                                multiple
                                            />
                                        </div>
                                        {!errorUpload ? (
                                            <></>
                                        ) : (
                                            <div className="text-danger error-validation p-0 text-start">
                                                {errorUpload}
                                            </div>
                                        )}
                                    </div>
                                    <ToastContainer />
                                </div>
                                <div className="d-flex justify-content-start mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary col-lg-1 col-md-2 me-3"
                                        onClick={onSubmitFiles}
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

export default EditTask;
