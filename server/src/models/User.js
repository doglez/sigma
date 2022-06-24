import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Config from "../config/Config.js";

const UserSchema = new mongoose.Schema(
    {
        collaboratorNumber: {
            type: String,
            required: [true, "Collaborator number is required."],
            unique: true,
            trim: true,
            maxlength: [
                10,
                "Collaborator number can not be more than 10 characters.",
            ],
            minlength: [
                3,
                "Collaborator number must be at least 3 characters.",
            ],
        },
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            maxlength: [25, "Name can not be more than 25 characters."],
            minlength: [3, "Name must be at least 3 characters."],
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required."],
            trim: true,
            maxlength: [25, "Last Name can not be more than 25 characters."],
            minlength: [3, "Last Name must be at least 3 characters."],
        },
        department: {
            type: String,
            required: [true, "Department is required."],
            trim: true,
            maxlength: [25, "Department can not be more than 25 characters."],
            minlength: [3, "Department must be at least 3 characters."],
        },
        country: {
            type: String,
            required: [true, "Country is required."],
            trim: true,
            maxlength: [25, "Country can not be more than 25 characters."],
            minlength: [3, "Country must be at least 3 characters."],
        },
        stateProvince: {
            type: String,
            required: [true, "State / Province is required."],
            trim: true,
            maxlength: [
                25,
                "State / Province can not be more than 25 characters.",
            ],
            minlength: [3, "State / Province must be at least 3 characters."],
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
        photo: {
            type: String,
        },
        role: {
            type: String,
            enum: [
                "super-admin",
                "admin",
                "chief",
                "supervisor",
                "engineer",
                "auditor",
            ],
            default: "engineer",
        },
        password: {
            type: String,
            select: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Standarization for name uppercase the first character of each word
UserSchema.pre("save", async function (next) {
    const splitStr = await this.name.toLowerCase().split(" ");

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    this.name = await splitStr.join(" ");
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, Config.JWT_SECRET, {
        expiresIn: Config.JWT_EXPIRE,
    });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Has token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

export default mongoose.model("User", UserSchema);
