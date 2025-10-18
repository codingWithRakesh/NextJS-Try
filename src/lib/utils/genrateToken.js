import jwt from "jsonwebtoken"

export const genrateAccessToken = async (user) => {
    return jwt.sign({
        _id : user._id,
        email : user.email,
        userName : user.userName
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const genrateRefreshToken = async (user) => {
    return jwt.sign({
        _id : user._id
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}