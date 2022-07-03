import mongoose from "mongoose";

const AgreementSchema = new mongoose.Schema(
    {
        agreementNumber: {
            type: String,
            required: [true, "Agreement number is required."],
            unique: true,
            trim: true,
            maxlength: [
                15,
                "Agreement number can not be more than 15 characters.",
            ],
            minlength: [3, "Agreement number must be at least 3 characters."],
        },
        reference: {
            type: String,
            required: [true, "Reference is required."],
            trim: true,
            unique: true,
            maxlength: [50, "Reference can not be more than 50 characters."],
            minlength: [3, "Reference must be at least 3 characters."],
        },
        provider: {
            unique: false,
            type: mongoose.Schema.ObjectId,
            ref: "Provider",
        },
        department: {
            unique: false,
            type: mongoose.Schema.ObjectId,
            ref: "Department",
        },
        startDate: {
            type: Date,
            required: true,
        },
        expDate: {
            type: Date,
            required: true,
        },
        equipments: {
            type: [mongoose.Schema.ObjectId],
            ref: "Equipment",
            unique: false,
            required: true,
        },
        files: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

// Reverse populate with virtuals
AgreementSchema.virtual("maintenancePlan", {
    ref: "MaintenancePlan",
    localField: "_id",
    foreignField: "agreement",
    justOne: false,
});

AgreementSchema.virtual("task", {
    ref: "Task",
    localField: "_id",
    foreignField: "agreement",
    justOne: false,
});

export default mongoose.model("Agreement", AgreementSchema);
