import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
    {
        departmentNumber: {
            type: String,
            required: [true, "Department number is required."],
            unique: true,
            trim: true,
            maxlength: [
                10,
                "Department number can not be more than 10 characters.",
            ],
            minlength: [3, "Department number must be at least 3 characters."],
        },
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            maxlength: [25, "Name can not be more than 25 characters."],
            minlength: [3, "Name must be at least 3 characters."],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
            lowercase: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Standarization for name uppercase the first character of each word
DepartmentSchema.pre("save", async function (next) {
    const splitStr = await this.name.toLowerCase().split(" ");

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    this.name = await splitStr.join(" ");
});

// Reverse populate with virtuals
DepartmentSchema.virtual("user", {
    ref: "User",
    localField: "_id",
    foreignField: "department",
    justOne: false,
});

DepartmentSchema.virtual("equipment", {
    ref: "Equipment",
    localField: "_id",
    foreignField: "department",
    justOne: false,
});

DepartmentSchema.virtual("agreement", {
    ref: "Agreement",
    localField: "_id",
    foreignField: "department",
    justOne: false,
});

DepartmentSchema.virtual("maintenancePlan", {
    ref: "MaintenancePlan",
    localField: "_id",
    foreignField: "department",
    justOne: false,
});

DepartmentSchema.virtual("task", {
    ref: "Task",
    localField: "_id",
    foreignField: "department",
    justOne: false,
});

export default mongoose.model("Department", DepartmentSchema);
