import React from "react";
import { Link } from "react-router-dom";

const Departments = () => {
    return (
        <div className="container">
            <h1 className="text-deep-saffron py-4 text-center">
                List of Departments
            </h1>
            <Link role="button" className="btn btn-primary mb-2" to="new">
                New Department
            </Link>
            <div className="scrollable-vertical">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Department #</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>25</td>
                            <td>Data Center</td>
                            <td>dc@example.com</td>
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

export default Departments;
