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
      ref: 'User'
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

// With sparse: true: MongoDB will only create index entries for documents that have a non-null value for that field. If a document doesn't have the field or has a null value for it, MongoDB will not create an index entry for that document.
