/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProvidersCrt } from "../../../redux/reducers/providersReducers/providersSlice.js";
import NoLogo from "../../../assets/images/NoLogo.png";

const ProvidersList = () => {
    const dispatch = useDispatch();
    const myRole = useSelector((state) => state.myInfoReducer.role);

    const handlerReload = () => {
        dispatch(getProvidersCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const providers = useSelector((state) => state.providersReducer.data);

    return (
        <div className="container">
            {!providers[0] ? (
                <div>Your Data is loading...</div>
            ) : (
                <div className="scrollable-horizontal">
                    <h1 className="text-deep-saffron py-4 text-center">
                        Providers List
                    </h1>
                    {myRole !== "admin" && myRole !== "chief" ? (
                        <></>
                    ) : (
                        <Link
                            role="button"
                            className="btn btn-primary mb-2"
                            to="new"
                        >
                            New Provider
                        </Link>
                    )}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">EIN</th>
                                {/* employer identification number (EIN) =  business tax ID number*/}
                                <th scope="col">Company Name</th>
                                <th scope="col">Country</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Logo</th>
                                {myRole !== "admin" && myRole !== "chief" ? (
                                    <></>
                                ) : (
                                    <th scope="col">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map((provider) => (
                                <tr key={provider._id}>
                                    <td>{provider.ein}</td>
                                    <td>{provider.name}</td>
                                    <td>{provider.country}</td>
                                    <td>{provider.email}</td>
                                    <td>{provider.phone}</td>
                                    <td>
                                        {!provider.logo ? (
                                            <img
                                                src={NoLogo}
                                                className="logo-provider"
                                                alt="..."
                                            />
                                        ) : (
                                            <img
                                                src={`${process.env.REACT_APP_FILE_URL_SERVER}/${provider.logo}`}
                                                className="logo-provider"
                                                alt={provider.name}
                                            />
                                        )}
                                    </td>
                                    {myRole !== "admin" &&
                                    myRole !== "chief" ? (
                                        <></>
                                    ) : (
                                        <td>
                                            <Link
                                                role="button"
                                                className="btn btn-warning mb-md-2 mb-lg-0 me-lg-2 me-md-0 button-action"
                                                to={`edit/${provider._id}`}
                                            >
                                                Update
                                            </Link>
                                            <Link
                                                role="button"
                                                className="btn btn-danger button-action"
                                                to={`delete/${provider._id}`}
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

export default ProvidersList;
