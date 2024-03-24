import { NextFunction, Request, Response } from "express";
import { usersModel } from "./../modals"
import { catchAsyncErrors } from "../middleWares/errorsMiddleware";
import { createActivationToken, generateRandomCode, } from "../utils/helpers";
import { conflictError409 } from "../utils/errors";
import { sendOtpEmail } from "../services/email";

interface IRegistrationBody {
    name: string
    email: string
    password: string
    avatar?: string
}

//req: Request<IParams, IQuery, IBody>
export const registrationUserController = catchAsyncErrors(async (req: Request<{}, {}, IRegistrationBody>, res: Response,  next: NextFunction) => {
    try {
       const { name, email, password, } = req.body

       const isUserExist = await usersModel.findOne({ email })
       if(isUserExist) {
        const err = conflictError409("User already exists with the provided email.")
        res.status(err.statusCode).json(err);
       }

       const activationCode = generateRandomCode({ length: 4 })
       const activationToken = createActivationToken({ user: { name, email, password }, activationCode, })

       await sendOtpEmail({ email, payload: { name, activationCode }})

       res.status(201).json({ activationToken, message: `Please check you email ${email} for account verification` })
    } catch (error) {
        
    }

})
