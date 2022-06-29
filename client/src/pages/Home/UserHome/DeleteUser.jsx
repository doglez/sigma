/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import NoUserPhoto from "../../../assets/images/NoUserPhoto.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteUserCrt,
    getUserCrt,
} from "../../../redux/reducers/usersReducers/userSlice.js";

const DeleteUser = () => {
    let navigate = useNavigate();
    const userId = window.location.pathname.split("/")[4];

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);

    const handlerReload = () => {
        dispatch(getUserCrt(userId));
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    return (
        <div className="container">
            {!user.name ? (
                <div>Your Data is loading...</div>
            ) : (
                <>
                    <Formik
                        initialValues={{
                            collaboratorNumber: user.collaboratorNumber,
                            name: user.name,
                            lastName: user.lastName,
                            country: user.country,
                            stateProvince: user.stateProvince,
                            phone: user.phone,
                            email: user.email,
                        }}
                        onSubmit={(values) => {
                            dispatch(deleteUserCrt(userId));
                            navigate("../", { replace: true });
                        }}
                    >
                        <Form className="text-center">
                            <h1 className="text-danger pt-4 ">
                                Warning you are going to delete the user Danilo
                            </h1>
                            <h5 className="text-danger pb-4">
                                This change is irreversible.
                            </h5>

                            <div className="row">
                                <div className="col-md-6 col-lg-4 pb-3">
                                    <div className="input-group">
                                        <label
                                            className="input-group-text col-5"
                                            htmlFor="collaboratorNumber"
                                        >
                                            Collaborator #
                                        </label>
                                        <Field
                                            name="collaboratorNumber"
                                            className="form-control"
                                            type="text"
                                            required
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 pb-3">
                                    <div className="input-group">
                                        <label
                                            className="input-group-text col-5"
                                            htmlFor="name"
                                        >
                                            Name
                                        </label>
                                        <Field
                                            name="name"
                                            className="form-control"
                                            type="text"
                                            required
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 pb-3">
                                    <div className="input-group">
                                        <label
                                            className="input-group-text col-5"
                                            htmlFor="lastName"
                                        >
                                            Last Name
                                        </label>
                                        <Field
                                            name="lastName"
                                            className="form-control"
                                            type="text"
                                            required
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 pb-3">
                                    <div className="input-group">
                                        <label
                                            className="input-group-text col-5"
                                            htmlFor="country"
                                        >
                                            Country
                                        </label>
                                        <Field
                                            name="country"
                                            className="form-control"
                                            type="text"
                                            required
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 pb-3">
                                    <div className="input-group">
                                        <label
                                            className="input-group-text col-5"
                                            htmlFor="stateProvince"
                                        >
                                            State/Province
                                        </label>
                                        <Field
                                            name="stateProvince"
                                            className="form-control"
                                            type="text"
                                            required
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-4 pb-3">
                                    <div className="input-group">
                                        <label
                                            className="input-group-text col-5"
                                            htmlFor="phone"
                                        >
                                            Phone
                                        </label>
                                        <Field
                                            name="phone"
                                            className="form-control"
                                            type="text"
                                            placeholder="Company Name"
                                            required
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 pb-3">
                                    <div className="input-group">
                                        <label
                                            className="input-group-text col-5"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <Field
                                            name="email"
                                            className="form-control"
                                            type="email"
                                            placeholder="Company Name"
                                            required
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start mt-3">
                                <button
                                    type="submit"
                                    className="btn btn-danger col-lg-1 col-md-2 me-3"
                                >
                                    Delete
                                </button>
                                <Link
                                    role="button"
                                    to="/home/users"
                                    className="btn btn-secondary col-lg-1 col-md-2"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </Form>
                    </Formik>
                    <div className="d-flex justify-content-center">
                        {!user.photo ? (
                            <img
                                src={NoUserPhoto}
                                className="rounded-circle photo-user-large mt-3"
                                alt="..."
                            />
                        ) : (
                            <img
                                src={`${process.env.REACT_APP_FILE_URL_SERVER}/${user.photo}`}
                                className="rounded-circle photo-user-large mt-3"
                                alt="..."
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DeleteUser;
