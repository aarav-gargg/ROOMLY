import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    // profileImage: {
    //     type: String,
    //     default:"",
    // },
    tripList:{
        type: Array,
        default:[],
    },
    wishList:{
        type: Array,
        default:[],
    },
    propertyList:{
        type: Array,
        default:[],
    },
    reservationList:{
        type: Array,
        default:[],
    }
},{timestamps:true});

const User=mongoose.model("UserData",userSchema);

export default User;