import mongoose from "mongoose"

export const connectDB =async ()=> {
    await mongoose.connect
    ('mongodb+srv://greatStack:aya1234567@cluster0.wacgwum.mongodb.net/front+back')
    .then(()=> console.log("bd connect"));
}