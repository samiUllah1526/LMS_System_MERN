import nodemailer from 'nodemailer'
import { render } from '@react-email/render';
import { OTPVerificationEmail } from './react_email_templates/OTPVerificationEmail';

type SendEmailType = { email: string, subject: string, template: string }
export const sendEmail = async ({ email, subject, template }: SendEmailType) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_EMAIL_SERVICE_NAME ?? 'smtp-relay.sendinblue.com',
            port: parseInt(process.env.SMTP_EMAIL_SERVER_PORT) ?? 587,
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL_SERVICE_USERNAME,
                pass: process.env.SMTP_EMAIL_SERVICE_PASSWORD,
            },
        })

        const isTransporterReady = await transporter.verify()
        console.info('Server is ready to send messages');
        if (!isTransporterReady) {
            console.error('Server cannot send messages');
        }

        const mailOptions = {
            subject,
            from: process.env.SYTEM_GENERATED_SENDER_EMAIL ?? "no-reply@lmsBySami.com",
            to: email ?? "sami.naazar1526@gmail.com",
            html: template ?? "<h1>Template did not load</h1>",
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response)
    }
    catch (error) {
        console.error('Server cannot send messages');
        console.error(error)
        throw error
    }
}

type SendOtpEmail = Omit<SendEmailType, "template" | "subject"> & { payload: { name: string; activationCode: number; } };
export const sendOtpEmail = async ({ email, payload }: SendOtpEmail) => {
    const template = await OTPVerificationEmail(payload).then(render)
    await sendEmail({ email, subject: "Verification OTP for Account Activation", template })
}
