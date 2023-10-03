const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');//hashing passwords
const crypto = require('crypto');//generating secure tokens and hashing.
const { passwordValidator, phoneValidator } = require('../utils/utils');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'provide_name']
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superAdmin'],
      default: 'user'
    },
    email: {
      type: String,
      required: [true, 'provide_email'],
      unique: true,
      lowercase: true,
      // The first element is a validation function, and the second element is an error message
      validate: [validator.isEmail, 'provide_valid_email']
    },
    gender: {
      type: String,
      enum: ['male', 'female']
    },
    phoneNumber: {
      type: String,
      //custom validation 
      //expects an object that contains a validator function and an optional message property.
      validate: phoneValidator,
    },
    password: {
      type: String,
      required: [true, 'provide_password'],
      validate: passwordValidator,
      //this field will not be included in the query results. 
      select: false
    },
    orphans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orphan'
      }
    ],
    families: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family'
      }
    ],
    bills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill'
      }
    ],
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  { timestamps: true }
);

//removes sensitive fields from the JSON output.
//This method is invoked whenever you attempt to convert a userSchema instance to JSON 
userSchema.methods.toJSON = function () {
  // creates a copy of the current document (this) and converts it to a plain JavaScript object using the toObject method. 
  const user = this.toObject();

  delete user.__v;
  delete user.password;
  delete user.passwordChangedAt;
  delete user.passwordResetExpires;
  delete user.passwordResetToken;
  return user;
};
//end result is a JSON representation

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

//CUSTOM METHOD
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(8).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 minutes = 600,000 milliseconds
  return resetToken; //send to eamil unhashed
};

const User = mongoose.model('User', userSchema);

module.exports = User;
