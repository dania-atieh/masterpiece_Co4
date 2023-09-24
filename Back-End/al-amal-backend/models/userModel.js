const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { passwordValidator, phoneValidator } = require('../utils/utils');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superAdmin'],
      default: 'user'
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    gender: {
      type: String,
      enum: ['male', 'female', '']
    },
    phoneNumber: {
      type: String,
      validate: phoneValidator,
      index: {
        unique: true,
        partialFilterExpression: { phoneNumber: { $exists: true, $ne: '' } }
      }
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      validate: passwordValidator,
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

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.__v;
  delete user.password;
  delete user.passwordChangedAt;
  delete user.passwordResetExpires;
  delete user.passwordResetToken;
  return user;
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(8).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
