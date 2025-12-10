import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import jwt from "jsonwebtoken"
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { ApiError } from "@/lib/utils/apiError";
import { ApiResponse } from "@/lib/utils/apiResponse";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = asyncHandler(async (request) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value || request.headers.get('Authorization')?.replace('Bearer ', '')
    if(!token){
        throw new ApiError(401,"unauthorize request");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid or expired token");
    }

    await dbConnect();
    const user = await UserModel.findById(decodedToken?._id).select("-refreshToken")
    if(!user){
        throw new ApiError(404, "user not found");
    }

    return NextResponse.json(
        new ApiResponse(200, {
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
            },
        }, "user fetch successful")
    )
})