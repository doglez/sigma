import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBarLinksInventory = () => {
    const myRole = useSelector((state) => state.myInfoReducer.role);

    return (
        <nav className="navbar-dark">
            <ul className="navbar-nav px-3 py-3">
                <li className="nav-item">
                    <Link to="/inventory" className="nav-link">
                        Inventory Dashboard
                    </Link>
                </li>
                {myRole === "chief" || myRole === "admin" ? (
                    <li className="nav-item">
                        <Link to="new" className="nav-link">
                            New Equipment
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
                <hr />
                <li className="nav-item">
                    <Link to="typelist" className="nav-link">
                        Equipment Type List
                    </Link>
                </li>
                {myRole === "chief" || myRole === "admin" ? (
                    <li className="nav-item">
                        <Link to="typelist/new" className="nav-link">
                            New Equipment Type
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
            </ul>
        </nav>
    );
};

export default SideBarLinksInventory;
