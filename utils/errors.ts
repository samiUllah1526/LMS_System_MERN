type Status = typeof STATUS[keyof typeof STATUS];


const STATUS = { 
    BAD_REQUEST: { message: "Bad Request", code: 400 }, 
    UNAUTHORIZED: { message: "Unauthorized", code: 401 }, 
    FORBIDDEN: { message: "Forbidden", code: 403 },  
    NOT_FOUND: { message: "Not Found", code: 404 },
    CONFLICT: { message: "Conflict", code: 409 },
    INTERENAL_SERVER_ERROR: { message: "Internal Server Error", code: 500 },  
} as const


export class APIError extends Error {
    public readonly status;
    public readonly statusCode;
    public readonly message;

    constructor(status: Status, description?: string) {
        super(description)
        this.status = status.message;
        this.statusCode = status.code;
        this.message = description ?? ""; 

        Error.captureStackTrace(this, this.constructor)
    }
}

export const badRequestError404 = (description?: string) => {
    return new APIError(STATUS.BAD_REQUEST, description)
}

export const unauthorizedError401 = (description?: string) => {
    return new APIError(STATUS.UNAUTHORIZED, description)
}

export const forbiddenError403 = (description?: string) => {
    return new APIError(STATUS.FORBIDDEN, description)
}

export const notFoundError404 = (description?: string) => {
    return new APIError(STATUS.NOT_FOUND, description)
}

export const conflictError409 = (description?: string) => {
    return new APIError(STATUS.CONFLICT, description)
}

export const internalServerError500 = (description?: string) => {
    return new APIError(STATUS.INTERENAL_SERVER_ERROR, description)
}


// Errors
// export const ROUTE_NOT_FOUND_ERROR = notFoundError("Route not found") 
// export const USER_ALREDY_EXISTS = conflictError("User already exists with the provided email.")