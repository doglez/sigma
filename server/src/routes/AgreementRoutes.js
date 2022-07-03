import express from "express";
import {
    createAgreement,
    deleteAgreement,
    getAgreements,
    showAgreement,
    updateAgreement,
    uploadFiles,
} from "../controllers/AgreementController.js";
import AdvancedResults from "../middleware/AdvancedResults.js";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import Agreement from "../models/Agreement.js";

const AgreementRoutes = express.Router();
AgreementRoutes.use(protect);

AgreementRoutes.route("/")
    .get(AdvancedResults(Agreement), getAgreements)
    .post(authorize("admin", "chief"), createAgreement);

AgreementRoutes.route("/:id")
    .get(showAgreement)
    .put(authorize("admin", "chief"), updateAgreement)
    .delete(authorize("admin", "chief"), deleteAgreement);

AgreementRoutes.route("/uploadfiles/:id").put(
    authorize("admin", "chief"),
    uploadFiles
);

export default AgreementRoutes;
