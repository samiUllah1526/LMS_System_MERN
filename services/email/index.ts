import nodemailer from 'nodemailer'
import { render } from '@react-email/render';
import { Email } from './react_email_templates/otp';

type SendEmailType = { email: string, subject: string, template: string }
export const sendEmail = async ({ email, subject, template }: SendEmailType) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_EMAIL_SERVICE_NAME,
        auth: {
            user: process.env.SMTP_EMAIL_SERVICE_USERNAME,
            pass: process.env.SMTP_EMAIL_SERVICE_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    // try {
    // const verifyPromise = promisify(transporter.verify);
    // await verifyPromise();
    // const isTransporterReady = transporter.verify()
    // console.info('Server is ready to send messages');
    // } catch (error) {
    // console.error('Server cannot send messages');
    // console.error(error);
    // return
    // }

    try {
        const isTransporterReady = await transporter.verify()
        console.info('Server is ready to send messages');
        if (!isTransporterReady) {
            console.error('Server cannot send messages');
        }
    } catch (error) {
        console.error('Server cannot send messages');
        console.error(error);
        // throw new Error()
    }

    const mailOptions = {
        subject,
        from: process.env.SYTEM_GENERATED_SENDER_EMAIL,
        to: email,
        html: template,
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response)
        return
    } catch (error) {
        console.error(error)
        return
    }
}

type SendOtpEmail = Omit<SendEmailType, "template" | "subject"> & { payload: { name: string; activationCode: string; } };
export const sendOtpEmail = async ({ email, payload }: SendOtpEmail) => {
    const template = render(Email(payload));
    await sendEmail({ email, subject: "Verification OTP for Account Activation", template })
    return "email sent"
}
