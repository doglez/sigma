import colors from "colors";
import cookieParser from "cookie-parser";
import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import Config from "./config/Config.js";
import ConnectDB from "./database/ConnectDB.js";
import Routes from "./routes/Routes.js";
import ErrorHandler from "./middleware/ErrorHandler.js";
import fileUpload from "express-fileupload";

colors.enable();

const app = express();
ConnectDB();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev loggin middleware
if (Config.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// File uploading
app.use(
    fileUpload({
        limits: { fieldSize: Config.MAX_FILE_UPLOAD },
        createParentPath: true,
        safeFileNames: true,
        preserveExtension: true,
        abortOnLimit: true,
    })
);

// Sanitize data prevent NoSQL injection && sanitize data
app.use(
    ExpressMongoSanitize({
        replaceWith: "_",
    })
);

// Set security header with helmet
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

// Prevent XSS attacks
app.use(xss());

// Rate limit
const limmiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 1000000,
});
app.use(limmiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(
    cors({
        origin: Config.CORS_ADMIT_URL,
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    })
);

// Route to access public dir
app.use(express.static("public"));

// Routes
app.use("/api/v1", Routes);

// Error handler
app.use(ErrorHandler);

// Listen port
const server = app.listen(Config.PORT, () => {
    console.log(
        `Server running in ${Config.NODE_ENV} mode on http://localhost:${Config.PORT}`
            .yellow.bold
    );
});

// Handle unhandle promise rejection
process.on("unhandledRejection", (err, promise) => {
    console.error(`Error: ${err}`.bgRed);
    server.close(() => process.exit(1));
});
