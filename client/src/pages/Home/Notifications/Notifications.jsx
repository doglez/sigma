import React from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
    return (
        <div className="container">
            <h1 className="text-deep-saffron py-4 text-center">
                Approval To-Do List
            </h1>

            <div className="scrollable-vertical">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Number</th>
                            <th scope="col">From</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>25</td>
                            <td>Danilo</td>
                            <td>Approve engineer</td>
                            <td>
                                <Link
                                    role="button"
                                    className="btn btn-warning mb-md-2 mb-lg-0 me-lg-2 me-md-0 button-action"
                                    to="task/1"
                                >
                                    Update
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Notifications;
