const Document = require('../models/Document')
const {
  canCreateDoc,
  canViewDoc,
  canEditDoc,
  canDeleteDoc,
  canPublishDoc,
  canAssignEditor,
} = require('../helpers/access')

// REFACTOR: проверки прав на действия с документами
exports.getDocuments = async (req, res) => {
  const documents = await Document.find().lean()
  const filtered = documents.filter((doc) => canViewDoc(req.user, doc))

  res.send({ data: filtered })
}

exports.getDocumentById = async (req, res) => {
  const document = await Document.findOne({ id: req.params.id }).lean()
  if (!document) return res.status(404).send({ error: 'Document not found' })
  if (!canViewDoc(req.user, document))
    return res.status(403).send({ error: 'Forbidden' })

  res.send({ data: document })
}

exports.createDocument = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })
    if (!canCreateDoc(req.user))
      return res.status(403).send({ error: 'Forbidden' })

    const payload = {
      ...req.body,
      owner_id: req.user.id,
      editor_id: null,
    }

    const doc = await Document.create(payload)
    res.status(201).send({ data: doc })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.updateDocument = async (req, res) => {
  try {
    const doc = await Document.findOne({ id: req.params.id })
    if (!doc) return res.status(404).send({ error: 'Document not found' })
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })
    if (!canEditDoc(req.user, doc))
      return res.status(403).send({ error: 'Forbidden' })

    const update = {}
    if (req.body.title !== undefined) update.title = req.body.title
    if (req.body.description !== undefined)
      update.description = req.body.description

    if (req.body.public !== undefined && canPublishDoc(req.user, doc)) {
      update.public = req.body.public
    }

    if (req.body.editor_id !== undefined && canAssignEditor(req.user, doc)) {
      update.editor_id = req.body.editor_id
    }

    const updated = await Document.findOneAndUpdate(
      { id: req.params.id },
      update,
      { new: true }
    )
    res.send({ data: updated })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findOne({ id: req.params.id })
    if (!doc) return res.status(404).send({ error: 'Document not found' })
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })
    if (!canDeleteDoc(req.user, doc))
      return res.status(403).send({ error: 'Forbidden' })

    await Document.deleteOne({ id: req.params.id })
    res.send({ error: null })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}
