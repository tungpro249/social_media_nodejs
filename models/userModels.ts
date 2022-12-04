// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        require: "true",
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        require: "true",
        trim: true,
        maxLength: 50,
        unique: true,
    },
    phone: {
        type: Number,
        require: "true",
        trim: true,
        maxLength: 10,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        maxLength: 50,
        unique: true,
    },
    gender: { type: String, default: "male" },
    password: String,
    follows: { type: Number, default: 0 },
    avatar: {
        type: String,
        default: "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
    },
    roles: {type: String, default:"user"}
},{
    timestamps: true
});

// Compile model from schema
const userModel = mongoose.model("userModel", UserSchema);
module.exports = userModel;