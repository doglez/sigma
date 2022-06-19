import React from "react";
import { Link } from "react-router-dom";

const AgreementsList = () => {
    return (
        <div className="container">
            <div className="scrollable-horizontal">
                <h1 className="text-deep-saffron py-4 text-center">
                    Agreements List
                </h1>
                <Link role="button" className="btn btn-primary mb-2" to="new">
                    New Agreement
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Agreement #</th>
                            <th scope="col">Provider Name</th>
                            <th scope="col">Reference</th>
                            <th scope="col">Equipment Qty.</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">Exp. Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>35aseraser</td>
                            <td>Doglez Inc.</td>
                            <td>Server and Storage</td>
                            <td>25</td>
                            <td>06/01/2021</td>
                            <td>05/31/2022</td>
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

export default AgreementsList;
