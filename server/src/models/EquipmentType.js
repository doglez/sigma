import mongoose from "mongoose";

const EquipmentTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            maxlength: [25, "Name can not be more than 25 characters."],
            minlength: [3, "Name must be at least 3 characters."],
            unique: true,
        },
        description: {
            type: String,
            required: [true, "Description is required."],
            trim: true,
            maxlength: [
                200,
                "Description can not be more than 200 characters.",
            ],
            minlength: [10, "Description must be at least 10 characters."],
        },
    },
    {
        timestamps: true,
    }
);

// Standarization for name uppercase the first character of each word
EquipmentTypeSchema.pre("save", async function (next) {
    const splitStr = await this.name.toLowerCase().split(" ");

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    this.name = await splitStr.join(" ");
});

export default mongoose.model("EquipmentType", EquipmentTypeSchema);
