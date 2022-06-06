import express from "express";

const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: "danilo",
    });
});

export default UserRouter;
