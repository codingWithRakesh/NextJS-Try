import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import TodoModel from "@/models/todo.model";
import { ApiError } from "@/lib/utils/apiError";
import { ApiResponse } from "@/lib/utils/apiResponse";
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const PUT = asyncHandler(async (req, { params }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value || req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
        throw new ApiError(401, "unauthorize request")
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid or expired token");
    }

    await dbConnect();
    const user = await UserModel.findById(decodedToken?._id).select("-refreshToken")
    if (!user) {
        throw new ApiError(404, "user not found");
    }

    const todoId = params.todoID
    const { isCommplete, content, title } = await req.json();

    const todo = await TodoModel.findByIdAndUpdate(
        todoId,
        {
            ...(title && { title }),
            ...(content && { content }),
            ...(isCommplete !== undefined && { isCommplete }),
        },
        { new: true }
    )
    if (!todo) {
        throw new ApiError(500, "failed to update")
    }

    return NextResponse.json(
        new ApiResponse(200, todo, "update successfully")
    )
})