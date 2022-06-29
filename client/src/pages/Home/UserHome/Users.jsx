/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NoUserPhoto from "../../../assets/images/NoUserPhoto.png";
import { getUsersCrt } from "../../../redux/reducers/usersReducers/usersSlice.js";

const Users = () => {
    const dispatch = useDispatch();

    const handlerReload = () => {
        dispatch(getUsersCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const users = useSelector((state) => state.usersReducer.data);

    return (
        <div className="container">
            <h1 className="text-deep-saffron py-4 text-center">
                List of Users
            </h1>
            <Link role="button" className="btn btn-primary mb-2" to="new">
                New User
            </Link>
            {!users ? (
                <div>Your Data is loading...</div>
            ) : (
                <div className="scrollable-horizontal scrollable-horizontal-allways">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Collaborator #</th>
                                <th scope="col">Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                {/* <th scope="col">Department</th> */}
                                <th scope="col">Picture</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.collaboratorNumber}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    {/* <td>{user.department}</td> */}
                                    <td>
                                        {!user.photo ? (
                                            <img
                                                src={NoUserPhoto}
                                                className="rounded-circle photo-user"
                                                alt="..."
                                            />
                                        ) : (
                                            <img
                                                src={`${process.env.REACT_APP_FILE_URL_SERVER}/${user.photo}`}
                                                className="rounded-circle photo-user"
                                                alt="..."
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <Link
                                            role="button"
                                            className="btn btn-warning mb-md-2 mb-lg-0 me-lg-2 me-md-0 button-action"
                                            to={`edit/${user._id}`}
                                        >
                                            Update
                                        </Link>
                                        <Link
                                            role="button"
                                            className="btn btn-danger button-action"
                                            to={`delete/${user._id}`}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Users;
