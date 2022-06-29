/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDepartmentsCrt } from "../../../redux/reducers/departmentReducers/departmentsSlice.js";

const Departments = () => {
    const dispatch = useDispatch();
    const myRole = useSelector((state) => state.myInfoReducer.role);

    const handlerReload = () => {
        dispatch(getDepartmentsCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const departments = useSelector((state) => state.departmentsReducer.data);

    return (
        <div className="container">
            <h1 className="text-deep-saffron py-4 text-center">
                List of Departments
            </h1>
            {myRole !== "super-admin" &&
            myRole !== "admin" &&
            myRole !== "chief" ? (
                <></>
            ) : (
                <Link role="button" className="btn btn-primary mb-2" to="new">
                    New Department
                </Link>
            )}
            {!departments ? (
                <div>Your Data is loading...</div>
            ) : (
                <div className="scrollable-horizontal">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Department #</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                {myRole !== "super-admin" &&
                                myRole !== "admin" &&
                                myRole !== "chief" ? (
                                    <></>
                                ) : (
                                    <th scope="col">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department) => (
                                <tr key={department._id}>
                                    <td>{department.departmentNumber}</td>
                                    <td>{department.name}</td>
                                    <td>{department.email}</td>
                                    {myRole !== "super-admin" &&
                                    myRole !== "admin" &&
                                    myRole !== "chief" ? (
                                        <></>
                                    ) : (
                                        <td>
                                            <Link
                                                role="button"
                                                className="btn btn-warning mb-md-2 mb-lg-0 me-lg-2 me-md-0 button-action"
                                                to={`edit/${department._id}`}
                                            >
                                                Update
                                            </Link>
                                            <Link
                                                role="button"
                                                className="btn btn-danger button-action"
                                                to={`delete/${department._id}`}
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Departments;
