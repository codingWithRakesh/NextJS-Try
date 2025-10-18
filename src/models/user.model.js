import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema({
    userName : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    refreshToken : {
        type : String
    }
},{timestamps: true})

const UserModel = mongoose.models.User || model('User', userSchema)

export default UserModel