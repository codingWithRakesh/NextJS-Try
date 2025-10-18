import { NextResponse } from "next/server";

export function asyncHandler(handler) {
    return async (req, context) => {
        try {
            return await handler(req, context);
        } catch (error) {
            const status = error.statusCode || 500;
            const message = error.message || "Internal Server Error";
            console.log(error)
            return NextResponse.json(
                { success: false, message, errors: error.errors || [] },
                { status }
            );
        }
    };
}
