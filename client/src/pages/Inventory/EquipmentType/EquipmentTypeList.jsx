import React from "react";
import { Link } from "react-router-dom";

const EquipmentTypeList = () => {
    return (
        <div className="container">
            <div className="scrollable-horizontal">
                <h1 className="text-deep-saffron py-4 text-center">
                    Inventory
                </h1>
                <Link role="button" className="btn btn-primary" to="new">
                    New Equipment Type
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Type Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Servers</td>
                            <td>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Illum vel perferendis cumque
                                recusandae
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

export default EquipmentTypeList;
