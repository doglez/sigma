import fs from "fs";
import mongoose from "mongoose";
import colors from "colors";
import Config from "../config/Config.js";
import Company from "../models/Company.js";
import Department from "../models/Department.js";
import User from "../models/User.js";

mongoose.connect(Config.MONGO_URL);

const __dirname = process.cwd();

// Read JSON files
const company = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/company.json`, "utf-8")
);
const departments = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/departments.json`, "utf-8")
);
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const importData = async () => {
    try {
        await Company.create(company);
        await Department.create(departments);
        await User.create(users);

        console.log("Data imported...".green.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

const deleteData = async () => {
    try {
        await Company.deleteMany();
        await Department.deleteMany();
        await User.deleteMany();

        console.log("Data destroyed...".red.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}