const mongoose = require('mongoose')

const ElementSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    image_url: { type: String, required: true },
    owner_id: { type: String, required: true },
    public: { type: Boolean, default: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Element', ElementSchema)
