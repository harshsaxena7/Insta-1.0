const mongoose = require("mongoose")
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others']
    },
    DateOfBirth: {
        type: Number
    },
    profilepic: {
        type: String,
    },
    followers: {
        type: Array,
    },
    followins: {
        type: Array,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    bio: {
        type: String,
        default:null
    },
    city: {
        type: String,
        default:null
    },
    from: {
        type: String,
        default : null
    },
    relationship: {
        type: String,
        enum: ['Single', 'Couple', 'Complicated'],
        default:'Single'
    }
},
    { timestamps: true }


)
UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    }
    catch (error) {
        next(error)
    }
})
module.exports = mongoose.model("User", UserSchema);