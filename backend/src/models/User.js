import {Schema, model} from "mongoose"
const userSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },

    username : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:  true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    age : {
        type: Number,
        default: 18
    }
})
module.exports = model("User", userSchema)
