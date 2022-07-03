import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["cm", "pm"],
            default: "pm",
        },
        taskNumber: {
            type: Number,
            unique: true,
            required: true,
        },
        department: {
            unique: false,
            type: mongoose.Schema.ObjectId,
            ref: "Department",
        },
        maintenancePlan: {
            type: mongoose.Schema.ObjectId,
            ref: "MaintenancePlan",
            unique: false,
        },
        equipment: {
            type: mongoose.Schema.ObjectId,
            ref: "Equipment",
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["backlog", "in-progress", "done", "cancel"],
            default: "backlog",
        },
        file: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Task", TaskSchema);
