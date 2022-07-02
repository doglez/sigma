import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema(
    {
        inventoryNumber: {
            type: String,
            required: [true, "Inventory number is required."],
            unique: true,
            trim: true,
            maxlength: [
                15,
                "Inventory number can not be more than 15 characters.",
            ],
            minlength: [3, "Inventory number must be at least 3 characters."],
        },
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            unique: true,
            maxlength: [25, "Name can not be more than 25 characters."],
            minlength: [3, "Name must be at least 3 characters."],
        },
        brand: {
            type: String,
            required: [true, "Brand is required."],
            trim: true,
            maxlength: [25, "Brand can not be more than 25 characters."],
            minlength: [3, "Brand must be at least 3 characters."],
        },
        model: {
            type: String,
            required: [true, "Model is required."],
            trim: true,
            maxlength: [25, "Model can not be more than 25 characters."],
            minlength: [3, "Model must be at least 3 characters."],
        },
        serial: {
            type: String,
            required: [true, "Serial number is required."],
            trim: true,
            unique: true,
            maxlength: [
                25,
                "Serial number can not be more than 25 characters.",
            ],
            minlength: [3, "Serial number must be at least 3 characters."],
        },
        equipmentType: {
            unique: false,
            type: mongoose.Schema.ObjectId,
            ref: "EquipmentType",
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
        installDate: {
            type: Date,
            required: true,
        },
        usableLife: {
            type: Number,
            enum: [12, 24, 36, 48, 60, 120],
            default: 60,
        },
    },
    {
        timestamps: true,
    }
);

// Standarization for name uppercase the first character of each word
EquipmentSchema.pre("save", async function (next) {
    const splitStr = await this.name.toLowerCase().split(" ");

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    this.name = await splitStr.join(" ");
});

// Reverse populate with virtuals
EquipmentSchema.virtual("agreement", {
    ref: "Agreement",
    localField: "_id",
    foreignField: "equipment",
    justOne: false,
});

export default mongoose.model("Equipment", EquipmentSchema, "equipments");
