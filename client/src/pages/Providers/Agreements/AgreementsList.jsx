/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAgreementsCrt } from "../../../redux/reducers/agreementReducers/agreementsSlice.js";
import LoadinEffect from "../../LoadinEffect.jsx";

const AgreementsList = () => {
    const dispatch = useDispatch();
    const myRole = useSelector((state) => state.myInfoReducer.role);

    const handlerReload = () => {
        dispatch(getAgreementsCrt());
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handlerReload());
    }, []);

    const agreements = useSelector((state) => state.agreementsReducer.data);

    return (
        <div className="container">
            {!agreements[0] ? (
                <LoadinEffect />
            ) : (
                <div className="scrollable-horizontal">
                    <h1 className="text-deep-saffron py-4 text-center">
                        Agreements List
                    </h1>
                    {myRole !== "admin" && myRole !== "chief" ? (
                        <></>
                    ) : (
                        <Link
                            role="button"
                            className="btn btn-primary mb-2"
                            to="new"
                        >
                            New Agreement
                        </Link>
                    )}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Agreement #</th>
                                <th scope="col">Provider Name</th>
                                <th scope="col">Reference</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">Exp. Date</th>
                                {myRole !== "admin" && myRole !== "chief" ? (
                                    <></>
                                ) : (
                                    <th scope="col">Action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {agreements.map((agreement) => (
                                <tr key={agreement._id}>
                                    <td>{agreement.agreementNumber}</td>
                                    <td>{agreement.provider}</td>
                                    <td>{agreement.reference}</td>
                                    <td>{agreement.startDate.split("T")[0]}</td>
                                    <td>{agreement.expDate.split("T")[0]}</td>
                                    {myRole !== "admin" &&
                                    myRole !== "chief" ? (
                                        <></>
                                    ) : (
                                        <td>
                                            <Link
                                                role="button"
                                                className="btn btn-warning mb-md-2 mb-lg-0 me-lg-2 me-md-0 button-action"
                                                to={`edit/${agreement._id}`}
                                            >
                                                Update
                                            </Link>
                                            <Link
                                                role="button"
                                                className="btn btn-danger button-action"
                                                to={`delete/${agreement._id}`}
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

export default AgreementsList;
