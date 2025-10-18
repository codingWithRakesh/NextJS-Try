import dbConnect from "@/lib/dbConnect"
import UserModel from "@/models/user.model";
import bcrypt from "bcrypt"
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { ApiError } from "@/lib/utils/apiError";
import { ApiResponse } from "@/lib/utils/apiResponse";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (request) => {
    await dbConnect();

    const { userName, email, password } = await request.json()
    if (!userName || !email || !password) {
        throw new ApiError(400, "all fields are requered")
    }

    const existedUser = await UserModel.findOne({
        $or: [{ userName }, { email }]
    })
    if (existedUser) {
        throw new ApiError(400, "user alredy existed")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        userName,
        email,
        password: hashPassword
    })
    if (!user) {
        throw new ApiError(500, "user create failed")
    }

    return NextResponse.json(
        new ApiResponse(200, null, "user register successfully")
    )

})