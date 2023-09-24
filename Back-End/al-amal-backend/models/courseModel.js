const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    coachName: {
      type: String,
      required: true
    },
    courseImageUrl: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true,
      min: 13
    },
    price: {
      type: Number,
      required: true,
      min: 1
    },
    period: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
