const mongoose = require('mongoose')

const DocElSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    doc_id: { type: String, required: true },
    el_id: { type: String, required: true },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    size: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('DocEl', DocElSchema)
