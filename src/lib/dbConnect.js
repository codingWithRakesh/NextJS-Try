import mongoose from "mongoose";

const connection = {};

async function dbConnect(){
    if(connection.isConnected){
        console.log('alredy connected with DB');
        return;
    }
    try {
        const db = await mongoose.connect(`${process.env.MONGO_URL}/todoInNextJs`)
        connection.isConnected = db.connections[0].readyState;
        console.log("DB connected successfully")
    } catch (error) {
        console.error("connected failed", error);
        process.exit(1);
    }
}

export default dbConnect