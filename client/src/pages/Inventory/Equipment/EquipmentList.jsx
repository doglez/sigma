/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEquipmentsCrt } from "../../../redux/reducers/equipmentReducers/equipmentsSlice.js";
import { getEquipmentTypesCrt } from "../../../redux/reducers/equipmentTypeReducers/equipmentTypesSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";

const EquipmentList = () => {
    const dispatch = useDispatch();
    const myRole = useSelector((state) => state.myInfoReducer.role);

    const handlerReload = () => {
        dispatch(getEquipmentsCrt());
        dispatch(getEquipmentTypesCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const equipments = useSelector((state) => state.equipmentsReducer.data);
    const equipmentTypes = useSelector(
        (state) => state.equipmentTypesReducer.data
    );

    return (
        <div className="container">
            {!equipments[0] ? (
                <LoadinEffect />
            ) : (
                <div className="scrollable-horizontal">
                    <h1 className="text-deep-saffron py-4 text-center">
                        Inventory
                    </h1>
                    <div className="d-flex flex-row bd-highlight mb-3">
                        {myRole !== "admin" && myRole !== "chief" ? (
                            <></>
                        ) : (
                            <Link
                                role="button"
                                className="btn btn-primary me-3"
                                to="new"
                            >
                                New Equipment
                            </Link>
                        )}
                        <select
                            className="border-pink form-select form-wide"
                            aria-label="Default select example"
                        >
                            <option defaultValue>Equipment Type</option>
                            {equipmentTypes.map((equipmentType) => (
                                <option
                                    value={equipmentType._id}
                                    key={equipmentType._id}
                                >
                                    {equipmentType.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Inventory #</th>
                                <th scope="col">Equipment Name</th>
                                <th scope="col">Install Date</th>
                                <th scope="col">Usable life</th>
                                {myRole !== "admin" && myRole !== "chief" ? (
                                    <></>
                                ) : (
                                    <th scope="col">Action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {equipments.map((equipment) => (
                                <tr key={equipment._id}>
                                    <td>{equipment.inventoryNumber}</td>
                                    <td>{equipment.name}</td>
                                    <td>
                                        {equipment.installDate.split("T")[0]}
                                    </td>
                                    <td>{equipment.usableLife}</td>
                                    {myRole !== "admin" &&
                                    myRole !== "chief" ? (
                                        <></>
                                    ) : (
                                        <td>
                                            <Link
                                                role="button"
                                                className="btn btn-warning mb-md-2 mb-lg-0 me-lg-2 me-md-0 button-action"
                                                to={`edit/${equipment._id}`}
                                            >
                                                Update
                                            </Link>
                                            <Link
                                                role="button"
                                                className="btn btn-danger button-action"
                                                to={`delete/${equipment._id}`}
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

export default EquipmentList;
