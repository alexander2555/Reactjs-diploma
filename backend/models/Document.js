const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  updated_at: { type: String },
  owner_id: { type: String, required: true },
  editor_id: { type: String, default: null },
  public: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Document', DocumentSchema)
