const mongoose = require('mongoose')

const ElementSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    title: { type: String },
    description: { type: String },
    image_url: { type: String, required: true },
    owner_id: { type: String, required: true },
    public: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Element', ElementSchema)
