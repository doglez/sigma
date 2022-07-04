import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredTaskCrt } from "../../../redux/reducers/tasksReducers/filteredTasksSlice.js";
import KanbanCard from "./KanbanCard.jsx";

const KanbanColumns = ({ dept }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener(
            "beforeunload",
            dispatch(getFilteredTaskCrt(dept))
        );
    }, [dispatch, dept]);

    const backlog = useSelector((state) => state.filteredTasksReducer.backlog);
    const inProgress = useSelector(
        (state) => state.filteredTasksReducer.inProgress
    );
    const done = useSelector((state) => state.filteredTasksReducer.done);
    const cancel = useSelector((state) => state.filteredTasksReducer.cancel);

    return (
        <div className="container">
            <div className="row">
                <div className="card bg-secondary mb-3 col me-3">
                    <div className="card-header text-white">Backlog</div>
                    <div className="card-body">
                        <KanbanCard tasks={backlog} />
                    </div>
                </div>
                <div className="card bg-primary mb-3 col">
                    <div className="card-header text-white">In Progress</div>
                    <div className="card-body">
                        <KanbanCard tasks={inProgress} />
                    </div>
                </div>
                <div className="card bg-success mb-3 col ms-3">
                    <div className="card-header text-white">Done</div>
                    <div className="card-body">
                        <KanbanCard tasks={done} />
                    </div>
                </div>
                <div className="card bg-danger mb-3 col ms-3">
                    <div className="card-header text-white">Cancel</div>
                    <div className="card-body">
                        <KanbanCard tasks={cancel} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KanbanColumns;
