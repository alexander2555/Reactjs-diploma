const Doc_el = require('../models/Doc_El')
const Document = require('../models/Document')
const Element = require('../models/Element')

const { canEditDoc } = require('../helpers/access')
const { mapDocEl } = require('../helpers/map')

const getDocEls = async (req, res) => {
  const { el_id } = req.query

  const filter = { el_id }

  const docEls = await Doc_el.find(filter).lean()
  res.status(200).send(docEls.map(mapDocEl))
}

const createDocEl = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

    const { doc_id, el_id } = req.body
    const doc = await Document.findOne({ _id: doc_id })
    if (!doc) return res.status(404).send({ error: 'Document not found' })
    if (!canEditDoc(req.user, doc)) return res.status(403).send({ error: 'Forbidden' })
    const el = await Element.findOne({ _id: el_id })
    if (!el) return res.status(404).send({ error: 'Element not found' })

    const newDocEl = await Doc_el.create({
      doc_id,
      el_id,
      ...req.body,
    })
    res.status(201).send(mapDocEl(newDocEl.toObject()))
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

const updateDocEl = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

    const { id, doc_id } = req.body
    const doc = await Document.findOne({ _id: doc_id })
    if (!doc) return res.status(404).send({ error: 'Document not found' })
    if (!canEditDoc(req.user, doc)) return res.status(403).send({ error: 'Forbidden' })

    const updatedDocEl = await Doc_el.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }).lean()
    res.status(200).send(mapDocEl(updatedDocEl))
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

const deleteDocEl = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

    const docEl = await Doc_el.findOne({ _id: req.params.id })
    if (!docEl) return res.status(404).send({ error: 'DocEl not found' })

    const doc = await Document.findOne({ _id: docEl.doc_id })
    if (!doc) return res.status(404).send({ error: 'Document not found' })
    if (!canEditDoc(req.user, doc)) return res.status(403).send({ error: 'Forbidden' })

    await Doc_el.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

module.exports = { getDocEls, createDocEl, updateDocEl, deleteDocEl }
