import React from "react";
import { Link } from "react-router-dom";

const KanbanCard = ({ tasks }) => {
    return (
        <div>
            {!tasks[0] ? (
                <></>
            ) : (
                tasks.map((task) => (
                    <div className="card mb-1" key={task._id}>
                        <div className="card-body mt">
                            <h5 className="card-title">{task.equipment}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {task.department}
                            </h6>
                            {!task.maintenancePlan ? (
                                <p className="card-text">No maintenance plan</p>
                            ) : (
                                <p className="card-text">
                                    {task.maintenancePlan}
                                </p>
                            )}
                            <Link
                                className="card-link"
                                to={`/maintenance/tasks/edit/${task._id}`}
                            >
                                {task.type}-{task.taskNumber}
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default KanbanCard;
