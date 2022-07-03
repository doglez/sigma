import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBarLinksMaintenance = () => {
    const myRole = useSelector((state) => state.myInfoReducer.role);

    return (
        <nav className="navbar-dark">
            <ul className="navbar-nav px-3 py-3">
                <li className="nav-item">
                    <Link to="/maintenance" className="nav-link">
                        Maintenance Plans
                    </Link>
                </li>
                {myRole === "chief" || myRole === "admin" ? (
                    <li className="nav-item">
                        <Link to="new" className="nav-link">
                            New Plan
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
                <hr />
                <li className="nav-item">
                    <Link to="tasks" className="nav-link">
                        Tasks
                    </Link>
                </li>
                {myRole === "chief" || myRole === "admin" ? (
                    <li className="nav-item">
                        <Link to="tasks/new" className="nav-link">
                            New Task
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
            </ul>
        </nav>
    );
};

export default SideBarLinksMaintenance;
