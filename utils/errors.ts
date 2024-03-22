type Status = typeof STATUS[keyof typeof STATUS];
type StatusMap = {
    [key: string]: { message: string, code: number };
};;

const STATUS: StatusMap = { 
    BAD_REQUEST: { message: "Bad Request", code: 400 }, 
    UNAUTHORIZED: { message: "Unauthorized", code: 401 }, 
    FORBIDDEN: { message: "Forbidden", code: 403 },  
    NOT_FOUND: { message: "Not Found", code: 404 },
    INTERENAL_SERVER_ERROR: { message: "Internal Server Error", code: 500 },  
} as const


export class APIError extends Error {
    public readonly status;
    public readonly statusCode;
    public readonly description;

    constructor(status: Status, description?: string) {
        super(description)
        this.status = status.message;
        this.statusCode = status.code;
        this.description = description ?? ""; 

        Error.captureStackTrace(this, this.constructor)
    }
}

export const badRequestError = (description?: string) => {
    return new APIError(STATUS.BAD_REQUEST, description)
}

export const unauthorizedError = (description?: string) => {
    return new APIError(STATUS.UNAUTHORIZED, description)
}

export const forbiddenError = (description?: string) => {
    return new APIError(STATUS.FORBIDDEN, description)
}

export const notFoundError = (description?: string) => {
    return new APIError(STATUS.NOT_FOUND, description)
}

export const internalServerError = (description?: string) => {
    return new APIError(STATUS.INTERENAL_SERVER_ERROR, description)
}


// Errors
export const ROUTE_NOT_FOUND_ERROR = notFoundError("Route not found") 
    