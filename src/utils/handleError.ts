import { HttpError } from "@refinedev/core";

export const handleError = (error: any): HttpError => {
    return {
        message:
            error?._server_messages?.message ||
            error?.exception ||
            error?.message ||
            "Something went wrong",
        statusCode: error?.httpStatus || 500,
        errors: error,
    };
};
