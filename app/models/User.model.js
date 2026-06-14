
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    noOfBabies : {
        type : Number,
    },
    deliveryType : {
        type : String,
    },
    BabyDet : [
        {
            babyName : {
                type : String,
            },
            dateOfBirth : {
                type : Date,
            },
            time : {
                type : String,
            },
            gender : {
                type : String,
                enum : ['female' , 'male' , 'other']
            },
            Weight : {
                type : String,
            }

        }
    ],
},
    {
        timestamps : true
    });

    
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;