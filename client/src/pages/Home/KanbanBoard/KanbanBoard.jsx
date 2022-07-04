/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsCrt } from "../../../redux/reducers/departmentsReducers/departmentsSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";
import KanbanColumns from "./KanbanColumns.jsx";

const KanbanBoard = () => {
    const [dept, setDept] = useState("");
    const dispatch = useDispatch();

    const handleDepartmentSelect = (e) => {
        setDept(e.target.value);
    };

    const handlerReload = () => {
        dispatch(getDepartmentsCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const departments = useSelector((state) => state.departmentsReducer.data);

    return (
        <div className="container">
            {!departments[0] ? (
                <LoadinEffect />
            ) : (
                <>
                    <div className="d-flex justify-content-between">
                        <select
                            className="form-select mb-3 department-select border-teal"
                            aria-label="Default select example"
                            onChange={handleDepartmentSelect}
                        >
                            <option defaultValue value="">
                                Selecte your department
                            </option>
                            {departments.map((department) => (
                                <option
                                    value={department._id}
                                    key={department._id}
                                >
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <KanbanColumns dept={dept} />
                </>
            )}
        </div>
    );
};

export default KanbanBoard;
