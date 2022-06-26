import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["enable", "disable"],
            default: "enable",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Token", TokenSchema);
