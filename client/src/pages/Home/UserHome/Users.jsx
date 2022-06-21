import React from "react";
import { Link } from "react-router-dom";
import NoUserPhoto from "../../../assets/images/NoUserPhoto.png";

const Users = () => {
    return (
        <div className="container">
            <h1 className="text-deep-saffron py-4 text-center">
                List of Users
            </h1>
            <Link role="button" className="btn btn-primary mb-2" to="new">
                New User
            </Link>

            <div className="scrollable-horizontal">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Collaborator #</th>
                            <th scope="col">Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Department</th>
                            <th scope="col">Role</th>
                            <th scope="col">Picture</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>25</td>
                            <td>Danilo</td>
                            <td>Gonzalez</td>
                            <td>danilo.gonzalez@example.com</td>
                            <td>Data Center</td>
                            <td>Engineer</td>
                            <td>
                                <img
                                    src={NoUserPhoto}
                                    className="rounded-circle photo-user"
                                    alt="..."
                                />
                            </td>
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

export default Users;
