import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import bcrypt from "bcrypt"
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { ApiError } from "@/lib/utils/apiError";
import { ApiResponse } from "@/lib/utils/apiResponse";
import { NextResponse } from "next/server";
import { genrateRefreshToken, genrateAccessToken } from "@/lib/utils/genrateToken"
import { cookies } from "next/headers";

export const POST = asyncHandler(async (request) => {
    await dbConnect();

    const { userName, email, password } = await request.json();
    if (!userName && !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await UserModel.findOne({
        $or: [{ userName }, { email }],
    }).select("+password");
    if (!user) {
        throw new ApiError(404, "user not found")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = await genrateAccessToken(user);
    const refreshToken = await genrateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const cookieStore = cookies();
    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    return NextResponse.json(
        new ApiResponse(200, {
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
            },
            accessToken,
            refreshToken
        }, "Login successful")
    );
})