const DocEl = require('../models/DocEl')
const Document = require('../models/Document')
const { canViewDoc, canEditDoc } = require('../helpers/access')

// TODO - обязательно ли doc_id и el_id?
// TODO - нужен фильтр по doc_id или el_id
exports.getDocEls = async (req, res) => {
  const { doc_id, el_id } = req.query

  if (!doc_id) return res.status(400).send({ error: 'doc_id is required' })

  const doc = await Document.findOne({ id: doc_id }).lean()
  if (!doc) return res.status(404).send({ error: 'Document not found' })
  if (!canViewDoc(req.user, doc))
    return res.status(403).send({ error: 'Forbidden' })

  const filter = { doc_id }
  if (el_id) filter.el_id = el_id

  const docEls = await DocEl.find(filter).lean()
  res.send({ data: docEls })
}

// TODO - нужно ли ?
exports.getDocElById = async (req, res) => {
  const docEl = await DocEl.findOne({ id: req.params.id }).lean()
  if (!docEl) return res.status(404).send({ error: 'DocEl not found' })

  const doc = await Document.findOne({ id: docEl.doc_id }).lean()
  if (!doc) return res.status(404).send({ error: 'Document not found' })
  if (!canViewDoc(req.user, doc))
    return res.status(403).send({ error: 'Forbidden' })

  res.send({ data: docEl })
}

// TODO - для создания нужен doc_id и el_id
exports.createDocEl = async (req, res) => {
  try {
    const { doc_id } = req.body
    const doc = await Document.findOne({ id: doc_id })
    if (!doc) return res.status(404).send({ error: 'Document not found' })
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })
    if (!canEditDoc(req.user, doc))
      return res.status(403).send({ error: 'Forbidden' })

    const docEl = await DocEl.create(req.body)
    res.status(201).send({ data: docEl })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

// TODO - для обновления нужен doc_id и el_id
exports.updateDocEl = async (req, res) => {
  try {
    const docEl = await DocEl.findOne({ id: req.params.id })
    if (!docEl) return res.status(404).send({ error: 'DocEl not found' })

    const doc = await Document.findOne({ id: docEl.doc_id })
    if (!doc) return res.status(404).send({ error: 'Document not found' })
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })
    if (!canEditDoc(req.user, doc))
      return res.status(403).send({ error: 'Forbidden' })

    const updated = await DocEl.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    )
    res.send({ data: updated })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

// TODO - для удаления нужен doc_id и el_id
exports.deleteDocEl = async (req, res) => {
  try {
    const docEl = await DocEl.findOne({ id: req.params.id })
    if (!docEl) return res.status(404).send({ error: 'DocEl not found' })

    const doc = await Document.findOne({ id: docEl.doc_id })
    if (!doc) return res.status(404).send({ error: 'Document not found' })
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })
    if (!canEditDoc(req.user, doc))
      return res.status(403).send({ error: 'Forbidden' })

    await DocEl.deleteOne({ id: req.params.id })
    res.send({ error: null })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}
