import mongoose from "mongoose";

const ProviderSchema = new mongoose.Schema(
    {
        ein: {
            type: String,
            required: [true, "Enterprise identification number is required."],
            unique: true,
            trim: true,
            maxlength: [
                10,
                "Enterprise identification number can not be more than 10 characters.",
            ],
            minlength: [
                3,
                "Enterprise identification number must be at least 3 characters.",
            ],
        },
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            maxlength: [50, "Name can not be more than 50 characters."],
            minlength: [3, "Name must be at least 3 characters."],
        },
        country: {
            type: String,
            required: [true, "Country is required."],
            trim: true,
        },
        phone: {
            type: Number,
            required: [true, "Phone number is required."],
            trim: true,
            maxlength: [25, "Phone number can not be more than 25 characters."],
            minlength: [3, "Phone number must be at least 3 characters."],
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
        website: {
            type: String,
            required: [true, "Please add an website"],
            match: [
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                "Please use a valid URL with HTTP or HTTPS",
            ],
        },
        logo: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Standarization for name uppercase the first character of each word
ProviderSchema.pre("save", async function (next) {
    const splitStr = await this.name.toLowerCase().split(" ");

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    this.name = await splitStr.join(" ");
});

// Reverse populate with virtuals
ProviderSchema.virtual("equipment", {
    ref: "Equipment",
    localField: "_id",
    foreignField: "provider",
    justOne: false,
});

ProviderSchema.virtual("agreement", {
    ref: "Agreement",
    localField: "_id",
    foreignField: "provider",
    justOne: false,
});

export default mongoose.model("Provider", ProviderSchema);
