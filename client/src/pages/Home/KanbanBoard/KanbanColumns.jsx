import React from "react";
import KanbanCard from "./KanbanCard.jsx";

const KanbanColumns = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="card bg-secondary mb-3 col me-3">
                    <div className="card-header text-white">Backlog</div>
                    <div className="card-body">
                        <KanbanCard />
                    </div>
                </div>
                <div className="card bg-primary mb-3 col">
                    <div className="card-header text-white">In Progress</div>
                    <div className="card-body">
                        <KanbanCard />
                    </div>
                </div>
                <div className="card bg-success mb-3 col ms-3">
                    <div className="card-header text-white">Done</div>
                    <div className="card-body">
                        <KanbanCard />
                    </div>
                </div>
                <div className="card bg-danger mb-3 col ms-3">
                    <div className="card-header text-white">Cancel</div>
                    <div className="card-body">
                        <KanbanCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KanbanColumns;
