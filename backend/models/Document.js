const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    owner_id: { type: String, required: true },
    editor_id: { type: String, default: null },
    public: { type: Boolean, default: false },
    bg_color: { type: String, default: 'white' },
    size: {
      width: { type: Number, default: 800 },
      height: { type: Number, default: 1000 },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Document', DocumentSchema)
