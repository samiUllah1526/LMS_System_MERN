import mongoose, { Document, Model, Schema, } from "mongoose";
import bcrypt from "bcryptjs";
import { emailRegExp } from "../utils/helpers";


export interface IUser extends Document {
    name: string
    email: string
    password: string
    avatar: {
        public_id: string
        url: string
    }
    role: string
    isVerified: boolean
    courses: Array<{ courseId: string }>
    comparePassword: (password: string) => Promise<boolean>
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Please enter your email"],
        validate: {
            validator: emailRegExp,
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: 8,
        select: false,
    },
    avatar: {
        public_id: { type: String, },
        url: { type: String, },
    },
    role: {
        type: String,
        default: "user",
        enum: ["user"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    courses: [
        {
            courseId: { type: String, }
        }
    ]

}, { timestamps: true })

userSchema.pre<IUser>("save", async function hashPassword(next) {
    if (!this.isModified) next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function(password:string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password)
}

export const usersModel: Model<IUser> = mongoose.model("Users", userSchema)
