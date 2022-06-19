import React from "react";
import { Link } from "react-router-dom";

const EquipmentList = () => {
    return (
        <div className="container">
            <div className="scrollable-horizontal">
                <h1 className="text-deep-saffron py-4 text-center">
                    Inventory
                </h1>
                <div className="d-flex flex-row bd-highlight mb-3">
                    <Link role="button" className="btn btn-primary" to="new">
                        New Equipment
                    </Link>
                    <select
                        className="mx-3 border-pink form-select form-wide"
                        aria-label="Default select example"
                    >
                        <option defaultValue>Equipment Type</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                    </select>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Inventory #</th>
                            <th scope="col">Equipment Name</th>
                            <th scope="col">Equipment Type</th>
                            <th scope="col">Department</th>
                            <th scope="col">Install Date</th>
                            <th scope="col">Usable life</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10002635</td>
                            <td>SERVER-DELL-50TB</td>
                            <td>Server</td>
                            <td>Data Center</td>
                            <td>06/25/2021</td>
                            <td>36</td>
                            <td>
                                <Link
                                    role="button"
                                    className="btn btn-warning mb-md-2 mb-lg-0 me-lg-2 me-md-0 button-action"
                                    to="edit/1"
                                >
                                    Update
                                </Link>
                                <Link
                                    role="button"
                                    className="btn btn-danger button-action"
                                    to="delete/1"
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EquipmentList;
