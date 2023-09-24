const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const familySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    socialStudyUrl: {
      type: String,
      required: true
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      sparse: true
    },
    bills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Family', familySchema);
