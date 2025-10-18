import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import jwt from "jsonwebtoken"
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { ApiError } from "@/lib/utils/apiError";
import { ApiResponse } from "@/lib/utils/apiResponse";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = asyncHandler(async (req) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value || req.headers.get('Authorization')?.replace('Bearer ', '')
    if(!token){
        throw new ApiError(401,"unauthorize request")
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

    await UserModel.findByIdAndUpdate(user._id,{
        $unset : {
            refreshToken : 1
        }
    }, {new : true})

    ;(await cookieStore).delete("accessToken")
    ;(await cookieStore).delete("refreshToken")

    return NextResponse.json(
        new ApiResponse(200, null, "logout successfully")
    )
})