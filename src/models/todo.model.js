import mongoose, { Schema, model } from "mongoose";

const todoSchema = new Schema({
    title : {
        type : String,
    },
    content : {
        type : String
    },
    isCommplete : {
        type : Boolean,
        default : false
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps: true})

const TodoModel = mongoose.models.Todo || model('Todo', todoSchema);

export default TodoModel;