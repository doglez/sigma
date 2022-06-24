import express from "express";
import {
    createOrUpdateCompany,
    getCompany,
    uploadLogo,
} from "../controllers/CompanyController.js";
import { authorize, protect } from "../middleware/AuthMiddleware.js";

const CompanyRoutes = express.Router();
CompanyRoutes.use(protect);
CompanyRoutes.use(authorize("super-admin"));

CompanyRoutes.route("/").get(getCompany).put(createOrUpdateCompany);
CompanyRoutes.put("/uploadlogo", uploadLogo);

export default CompanyRoutes;
