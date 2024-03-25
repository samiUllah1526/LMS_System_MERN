import crypto from 'crypto';
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from '../modals';

export const emailRegExp = (email: string): boolean => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export const isNullorUndefined = (value: unknown): boolean => {
    return value === null || value === undefined;
}

export const isObject = (obj: unknown): boolean => {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
}

type SetTimeoutType = ReturnType<typeof setTimeout>
type Fn<T = void> = (...args: any[]) => T;
export const getDebounce = () => {
    let timer: SetTimeoutType;
    return (fn: Fn, d: number) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn, d);
    }
}

type Base64ToBlob = (rawBase64: string) => Promise<Blob>
export const base64ToBlob: Base64ToBlob = async (rawBase64) => {
    const base64 = await fetch(rawBase64);
    const blob = await base64.blob();
    return blob
}

// const crypto = require('crypto');
// crypto.randomBytes(32).toString('hex');
export const generateSecretKey = (size: number = 32): string => {
    // Generate random bytes of desired size (default 32 for strong key)
    const randomBytes = crypto.randomBytes(size);
    // Encode as hexadecimal string (common format for secret keys)
    return randomBytes.toString('hex');
}

export const generateRandomCode = ({ length = 4 }: { length: number }): number => {
    // Generate a random 16-byte buffer
    const randomBytes = crypto.randomBytes(8);

    // Convert the buffer to a non-negative integer (safe for negative conversion)
    const randomInt = randomBytes.readUInt32BE(0);

    // Add 1000 to ensure the code starts from 1000 (optional)
    let code = randomInt + 1000

    // re-genrate the code if code is not 4 digits long
    if(code.toString().length !== 4) {
        return generateRandomCode({ length })
    }
    return code
    // Format the code as a string with leading zeros (optional)
    // code = code.toString().padStart(4, '0') 
        //  new Intl.NumberFormat('en', { minimumIntegerDigits: length, useGrouping: false }).format(code);
}

type generateTokenType = {
    payload: any;
    secret: Secret;
    expiresIn?: string | number | undefined;
};
export const generateToken = ({ payload, secret, expiresIn }: generateTokenType) => {
    const token = jwt.sign(payload, secret as Secret, { expiresIn })
    return token;
}

type createActivationTokenType = { activationCode: number; user: Pick<IUser, "name" | "email" | "password">; }
export const createActivationToken = ({ user, activationCode }: createActivationTokenType) => {
    const payload = {
        user,
        activationCode,
    }

    const token = generateToken({ 
        payload, 
        secret: process.env.ACTIVATION_TOKEN_SECRET, 
        expiresIn: process.env.ACTIVATION_TOKEN_EXPIRY 
    })
    return { token }
}

// function generateFourDigitCode() {
//     // Generate a random number between 1000 and 9999 (inclusive)
//     const code = Math.floor(Math.random() * 9000) + 1000;
//     return code.toString(); // Convert the number to string
// }

// export const getDataURLFromFile = async (file, setter, state, key) => {
//     if (!file) return
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//     };
// }

// export const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
//     const byteCharacters = atob(b64Data);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//         const slice = byteCharacters.slice(offset, offset + sliceSize),
//             byteNumbers = new Array(slice.length);
//         for (let i = 0; i < slice.length; i++) {
//             byteNumbers[i] = slice.charCodeAt(i);
//         }
//         const byteArray = new Uint8Array(byteNumbers);

//         byteArrays.push(byteArray);
//     }

//     return new Blob(byteArrays, { type: contentType });
// };


