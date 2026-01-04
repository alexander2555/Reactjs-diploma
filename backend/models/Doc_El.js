const mongoose = require('mongoose')

const DocElSchema = new mongoose.Schema(
  {
    doc_id: { type: String, required: true },
    el_id: { type: String, required: true },
    position: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
    },
    size: {
      width: { type: Number, default: 100 },
      height: { type: Number, default: 100 },
    },
    rotation: { type: Number, default: 0 },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Doc_el', DocElSchema)
