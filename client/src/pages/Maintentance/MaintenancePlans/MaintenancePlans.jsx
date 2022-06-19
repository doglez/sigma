import React from "react";
import { Link } from "react-router-dom";

const MaintenancePlans = () => {
    return (
        <div className="container">
            <div className="scrollable-horizontal">
                <h1 className="text-deep-saffron py-4 text-center">
                    List of Maintenance Plans
                </h1>
                <Link role="button" className="btn btn-primary mb-2" to="new">
                    New Plan
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Year</th>
                            <th scope="col">Plan Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Chief</th>
                            <th scope="col">Equipments Qty.</th>
                            <th scope="col">Times a year</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2022</td>
                            <td>Server and Storage</td>
                            <td>Data Center</td>
                            <td>Danilo Gonzalez</td>
                            <td>25</td>
                            <td>12</td>
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

export default MaintenancePlans;
