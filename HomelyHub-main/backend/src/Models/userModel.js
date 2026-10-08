//user schema 

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true,
            maxLength: [50, "Name cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minLength: [8, "Password must be at least 8 characters long"],
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords do not match",
            },
        },
        phoneNumber:{
            type: String,
            required: [true, "Please enter your phone number"],
            unique: true,
            trim: true,
        
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        avatar: {
            url: {type:String},
            public_id: {
                type: String,
            },
        },
        passwordChangedAt: {
            type: Date,
        
        },
        passwordResetToken: {
            type: String,
            select: false,
            index:true
        },
        PasswordResetExpires: {
            type: Date,
            select: false,
        },


    },
    {timestamps: true}
)


//settings to not pass in response from server
userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password,
        delete ret.passwordConfirm,
        delete ret.passwordResetToken,
        delete ret.passwordResetExpires,
        delete ret.__v;
        return ret;
    },
}
)

//password logic
//Hashing the password before saving it to the database
userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    
})

//login checking password
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}


//
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}

//forgot password
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.PasswordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
}
const User = mongoose.model("User", userSchema);
//in mongodb:users
export {User};
