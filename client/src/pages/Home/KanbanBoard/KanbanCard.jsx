import React from "react";
import { Link } from "react-router-dom";

const KanbanCard = () => {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Equipment Name</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Equipment Type
                    </h6>
                    <p className="card-text">Plan Name</p>
                    <Link className="card-link" to="id">
                        MP20514
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default KanbanCard;
