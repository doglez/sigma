import React from "react";
import { Link } from "react-router-dom";

const ProvidersList = () => {
    return (
        <div className="container">
            <div className="scrollable-horizontal">
                <h1 className="text-deep-saffron py-4 text-center">
                    Providers List
                </h1>
                <Link role="button" className="btn btn-primary mb-2" to="new">
                    New Provider
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">EIN</th>
                            {/* employer identification number (EIN) =  business tax ID number*/}
                            <th scope="col">Company Name</th>
                            <th scope="col">Country</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>MAWER2022</td>
                            <td>Doglez Inc.</td>
                            <td>Honduras</td>
                            <td>contact@doglez.com</td>
                            <td>+50455555555</td>
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

export default ProvidersList;
