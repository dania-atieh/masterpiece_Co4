const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    id_orphan: {
      type: Schema.Types.ObjectId,
      ref: 'Orphan'
    },
    id_family: {
      type: Schema.Types.ObjectId,
      ref: 'Family'
    },
    description: {
      type: String,
      required: true,
      default: '-'
    },
    date: {
      type: Date,
      required: true
    },
    payments: {
      type: Number,
      required: true,
      min: 1
    },
    billFileUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bill', billSchema);
