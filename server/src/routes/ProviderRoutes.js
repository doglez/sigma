import express from "express";
import {
    createProvider,
    deleteProvider,
    getProviders,
    showProvider,
    updateProvider,
    uploadLogo,
} from "../controllers/ProviderController.js";
import AdvancedResults from "../middleware/AdvancedResults.js";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import Provider from "../models/Provider.js";

const ProviderRouter = express.Router();
ProviderRouter.use(protect);

ProviderRouter.route("/")
    .get(AdvancedResults(Provider), getProviders)
    .post(authorize("admin", "chief"), createProvider);
ProviderRouter.route("/:id")
    .get(showProvider)
    .put(authorize("admin", "chief"), updateProvider)
    .delete(authorize("admin", "chief"), deleteProvider);
ProviderRouter.route("/uploadlogo/:id").put(
    authorize("admin", "chief"),
    uploadLogo
);

export default ProviderRouter;
