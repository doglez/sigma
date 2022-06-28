import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            maxlength: [25, "Name can not be more than 25 characters."],
            minlength: [3, "Name must be at least 3 characters."],
        },
        address: {
            type: String,
            required: [true, "Address is required."],
            trim: true,
            maxlength: [50, "Address can not be more than 50 characters."],
            minlength: [10, "Address must be at least 10 characters."],
        },
        zipCode: {
            type: String,
            required: [true, "Zip Code is required."],
            trim: true,
            maxlength: [25, "Zip Code can not be more than 25 characters."],
            minlength: [3, "Zip Code must be at least 3 characters."],
        },
        country: {
            type: String,
            required: [true, "Country is required."],
            trim: true,
        },
        isoCountry: {
            type: String,
            required: [true, "Country is required."],
            trim: true,
        },
        stateProvince: {
            type: String,
            required: [true, "State / Province is required."],
            trim: true,
        },
        currency: {
            type: String,
            required: [true, "Currency is required."],
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
        tag: {
            type: String,
            required: true,
            unique: true,
            default: "unique",
        },
    },
    {
        timestamps: true,
    }
);

// Standarization for name uppercase the first character of each word
CompanySchema.pre("save", async function (next) {
    const splitStr = await this.name.toLowerCase().split(" ");

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    this.name = await splitStr.join(" ");
});

export default mongoose.model("Company", CompanySchema);
