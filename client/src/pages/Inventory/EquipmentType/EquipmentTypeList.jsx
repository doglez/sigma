/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEquipmentTypesCrt } from "../../../redux/reducers/equipmentTypeReducers/equipmentTypesSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";

const EquipmentTypeList = () => {
    const dispatch = useDispatch();
    const myRole = useSelector((state) => state.myInfoReducer.role);

    const handlerReload = () => {
        dispatch(getEquipmentTypesCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const equipmentTypes = useSelector(
        (state) => state.equipmentTypesReducer.data
    );

    return (
        <div className="container">
            {!equipmentTypes[0] ? (
                <LoadinEffect />
            ) : (
                <div className="scrollable-horizontal">
                    <h1 className="text-deep-saffron py-4 text-center">
                        Inventory
                    </h1>
                    {myRole !== "admin" && myRole !== "chief" ? (
                        <></>
                    ) : (
                        <Link
                            role="button"
                            className="btn btn-primary"
                            to="new"
                        >
                            New Equipment Type
                        </Link>
                    )}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Type Name</th>
                                <th scope="col">Description</th>
                                {myRole !== "admin" && myRole !== "chief" ? (
                                    <></>
                                ) : (
                                    <th scope="col">Action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentTypes.map((equipmentType) => (
                                <tr key={equipmentType._id}>
                                    <td>{equipmentType.name}</td>
                                    <td>{equipmentType.description}</td>
                                    {myRole !== "admin" &&
                                    myRole !== "chief" ? (
                                        <></>
                                    ) : (
                                        <td>
                                            <Link
                                                role="button"
                                                className="btn btn-warning mb-md-2 mb-lg-0 me-lg-2 me-md-0 button-action"
                                                to={`edit/${equipmentType._id}`}
                                            >
                                                Update
                                            </Link>
                                            <Link
                                                role="button"
                                                className="btn btn-danger button-action"
                                                to={`delete/${equipmentType._id}`}
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

export default EquipmentTypeList;
