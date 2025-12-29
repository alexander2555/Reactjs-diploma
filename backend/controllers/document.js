const Document = require('../models/Document')

exports.getDocuments = async (req, res) => {
  const documents = await Document.find().lean()
  res.send({ data: documents })
}

exports.getDocumentById = async (req, res) => {
  const document = await Document.findOne({ id: req.params.id }).lean()
  if (!document) return res.status(404).send({ error: 'Document not found' })
  res.send({ data: document })
}

exports.createDocument = async (req, res) => {
  try {
    const doc = await Document.create(req.body)
    res.status(201).send({ data: doc })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.updateDocument = async (req, res) => {
  try {
    const updated = await Document.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    res.send({ data: updated })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.deleteDocument = async (req, res) => {
  try {
    await Document.findOneAndDelete({ id: req.params.id })
    res.send({ error: null })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

