import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    }
});
const Owner = new mongoose.model('Owner',ownerSchema);
export default Owner;