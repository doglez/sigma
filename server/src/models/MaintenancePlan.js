import mongoose from "mongoose";

const MaintenancePlanSchema = new mongoose.Schema(
    {
        year: {
            type: Number,
            required: [true, "Year is required."],
            trim: true,
        },
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            maxlength: [50, "Name can not be more than 50 characters."],
            minlength: [3, "Name must be at least 3 characters."],
        },
        frequency: {
            type: Number,
            enum: [1, 2, 4, 6, 12],
            default: 12,
        },
        department: {
            unique: false,
            type: mongoose.Schema.ObjectId,
            ref: "Department",
        },
        agreement: {
            type: [mongoose.Schema.ObjectId],
            ref: "Agreement",
            unique: false,
            required: true,
        },
        equipments: {
            type: [mongoose.Schema.ObjectId],
            ref: "Equipment",
            unique: false,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Standarization for name uppercase the first character of each word
MaintenancePlanSchema.pre("save", async function (next) {
    const splitStr = await this.name.toLowerCase().split(" ");

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    this.name = await splitStr.join(" ");
});

MaintenancePlanSchema.virtual("task", {
    ref: "Task",
    localField: "_id",
    foreignField: "maintenancePlan",
    justOne: false,
});

export default mongoose.model("MaintenancePlan", MaintenancePlanSchema);
