const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [20, "User name must contains less or equal to 20 characters"],
    minLength: [2, "User name must contains minimum 2 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    lowercase: true,
    unique: true,

  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [6, "Password must be 6 charachters long"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "confirm password is required"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "password must be same",
    },
  },
  active:{
    type:Boolean,
    default:true
  }
});

//Indexing
userSchema.index({name:1})

//METHOD
userSchema.methods.isComparable = async function(inputPass, hasedPass){
    return await bcrypt.compare(inputPass,hasedPass)
}


//MIDDLEWARES
userSchema.pre('save', async function (next) {
    //run further only if password filed is modified
    if (!this.isModified('password')) return next();
    try {
      this.password = await bcrypt.hash(this.password, 12);
      this.confirmPassword = undefined;
      next();
    } catch (err) {
      return next(err);
    }
  });
  
  module.exports = mongoose.model("User", userSchema);
