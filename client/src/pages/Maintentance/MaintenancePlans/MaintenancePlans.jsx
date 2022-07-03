/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMaintenancePlansCrt } from "../../../redux/reducers/maintenancePlanReducers/maintenancePlansSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";

const MaintenancePlans = () => {
    const dispatch = useDispatch();
    const myRole = useSelector((state) => state.myInfoReducer.role);

    const handlerReload = () => {
        dispatch(getMaintenancePlansCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const maintenancePlans = useSelector(
        (state) => state.maintenancePlansReducer.data
    );

    return (
        <div className="container">
            {!maintenancePlans[0] ? (
                <LoadinEffect />
            ) : (
                <div className="scrollable-horizontal">
                    <h1 className="text-deep-saffron py-4 text-center">
                        List of Maintenance Plans
                    </h1>
                    {myRole !== "admin" && myRole !== "chief" ? (
                        <></>
                    ) : (
                        <Link
                            role="button"
                            className="btn btn-primary mb-2"
                            to="new"
                        >
                            New Plan
                        </Link>
                    )}

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Year</th>
                                <th scope="col">Plan Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Frequency</th>
                                <th scope="col">Qty. Agreement</th>
                                <th scope="col">Qty. Equipments</th>
                                <th scope="col">Qty. Tasks</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maintenancePlans.map((maintenancePlan) => (
                                <tr key={maintenancePlan._id}>
                                    <td>{maintenancePlan.year}</td>
                                    <td>{maintenancePlan.name}</td>
                                    <td>{maintenancePlan.department}</td>
                                    <td>{maintenancePlan.frequency}</td>
                                    <td>{maintenancePlan.agreement}</td>
                                    <td>{maintenancePlan.equipments}</td>
                                    <td>{maintenancePlan.totalTasks}</td>
                                    {myRole !== "admin" &&
                                    myRole !== "chief" ? (
                                        <></>
                                    ) : (
                                        <td>
                                            <Link
                                                role="button"
                                                className="btn btn-warning mb-md-2 mb-lg-0 me-lg-2 me-md-0 button-action"
                                                to={`edit/${maintenancePlan._id}`}
                                            >
                                                Update
                                            </Link>
                                            <Link
                                                role="button"
                                                className="btn btn-danger button-action"
                                                to={`delete/${maintenancePlan._id}`}
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

export default MaintenancePlans;
