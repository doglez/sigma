import nodemailer from "nodemailer";
import Config from "../config/Config.js";

const SendEmails = async (options) => {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: Config.SMTP_HOST,
        port: Config.SMTP_PORT,
        secure: false,
        auth: {
            user: Config.SMTP_EMAIL,
            pass: Config.SMTP_PASSWORD,
        },
    });

    // Set the messsage
    let message = {
        from: `${Config.FROM_NAME} <${Config.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.text,
    };

    // Send mail with defined transporter object
    const info = await transporter.sendMail(message);

    console.log(`Message sent: %s${info.messageId}`);
};

export default SendEmails;
