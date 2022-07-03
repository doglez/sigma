/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTasksCrt } from "../../../redux/reducers/tasksReducers/tasksSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";

const TasksList = () => {
    const dispatch = useDispatch();
    const myRole = useSelector((state) => state.myInfoReducer.role);

    const handlerReload = () => {
        dispatch(getTasksCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const tasks = useSelector((state) => state.tasksReducer.data);

    return (
        <div className="container">
            {!tasks[0] ? (
                <LoadinEffect />
            ) : (
                <div className="scrollable-horizontal">
                    <h1 className="text-deep-saffron py-4 text-center">
                        List of Tasks
                    </h1>
                    {myRole !== "supervisor" && myRole !== "chief" ? (
                        <></>
                    ) : (
                        <Link
                            role="button"
                            className="btn btn-primary mb-2"
                            to="new"
                        >
                            New Task
                        </Link>
                    )}

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Number</th>
                                <th scope="col">Department</th>
                                <th scope="col">User</th>
                                <th scope="col">Status</th>
                                {myRole !== "supervisor" &&
                                myRole !== "chief" &&
                                myRole !== "engineer" ? (
                                    <></>
                                ) : (
                                    <th scope="col">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task._id}>
                                    <td>{task.type}</td>
                                    <td>{task.taskNumber}</td>
                                    <td>{task.department}</td>
                                    <td>{task.user}</td>
                                    <td>{task.status}</td>
                                    <td>
                                        {myRole !== "supervisor" &&
                                        myRole !== "chief" &&
                                        myRole !== "engineer" ? (
                                            <></>
                                        ) : (
                                            <Link
                                                role="button"
                                                className="btn btn-warning mb-md-2 mb-lg-0 me-lg-2 me-md-0 button-action"
                                                to={`edit/${task._id}`}
                                            >
                                                Update
                                            </Link>
                                        )}
                                        {myRole !== "supervisor" &&
                                        myRole !== "chief" ? (
                                            <></>
                                        ) : (
                                            <Link
                                                role="button"
                                                className="btn btn-danger button-action"
                                                to={`cancel/${task._id}`}
                                            >
                                                Delete
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TasksList;
