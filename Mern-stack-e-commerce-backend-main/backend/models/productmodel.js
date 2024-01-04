import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true,
    },

    slug:{
        type: String,
        lowercase:true
    },

    description:{
        type: String,
        required: true,
        
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true
    },
    quantity:{
        type: Number,
        required: true,
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    price:{
        type: Number,
    },
},{timestamps:true})

export default mongoose.model("Products", ProductSchema);