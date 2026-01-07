const Document = require('../models/Document')
const Doc_el = require('../models/Doc_El')

const {
  canCreateDoc,
  canViewDoc,
  canEditDoc,
  canDeleteDoc,
  canAssignRights,
} = require('../helpers/access')

const { mapDoc, mapDocEl } = require('../helpers/map')

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().lean()
    const filtered = documents.filter(doc => canViewDoc(req.user, doc))

    res.status(200).send(filtered.map(mapDoc))
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).lean()

    if (!document) return res.status(404).send({ error: 'Document not found' })

    if (!canViewDoc(req.user, document))
      return res.status(403).send({ error: 'Forbidden' })

    const docEls = await Doc_el.find({ doc_id: document._id }).lean()

    res.status(200).send(mapDoc({ ...document, elements: docEls.map(mapDocEl) }))
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

const createDocument = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

    if (!canCreateDoc(req.user)) return res.status(403).send({ error: 'Forbidden' })

    const { elements = [], ...data } = req.body

    const newDoc = {
      ...data,
      owner_id: req.user.id,
    }

    const doc = await Document.create(newDoc)

    if (Array.isArray(elements) && elements.length) {
      // При создании документа удалённые элементы не добавляются
      const docEls = elements
        .filter(el => !el.delete)
        .map(el => ({
          ...el,
          doc_id: doc.id,
        }))

      if (docEls.length) {
        await Doc_el.insertMany(docEls)
      }
    }

    const docEls = await Doc_el.find({ doc_id: doc.id }).lean()

    res.status(201).send(mapDoc({ ...doc.toObject(), elements: docEls.map(mapDocEl) }))
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

const updateDocument = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

    const doc = await Document.findOne({ _id: req.params.id })

    if (!doc) return res.status(404).send({ error: 'Document not found' })
    if (!canEditDoc(req.user, doc))
      return res.status(403).send({ error: 'Forbidden (can not edit)' })

    const { elements = [], ...docData } = req.body

    if (docData.public !== undefined) {
      if (!canAssignRights(req.user, doc)) delete docData.public
      // return res.status(403).send({ error: 'Forbidden (can not publish/unpublish)' })
    }

    if (docData.editor_id !== undefined) {
      if (!canAssignRights(req.user, doc)) delete docData.editor_id
      // return res.status(403).send({ error: 'Forbidden (can not assign editor)' })
    }

    const updatedDoc = await Document.findOneAndUpdate({ _id: req.params.id }, docData, {
      new: true,
    }).lean()

    if (Array.isArray(elements) && elements.length) {
      const toUpdate = elements.filter(el => el.update && !(el.create || el.delete))
      const toCreate = elements.filter(el => el.create)
      const toDelete = elements.filter(el => el.delete)

      if (toUpdate.length) {
        await Promise.all(
          toUpdate.map(({ id, update, ...elData }) =>
            Doc_el.findOneAndUpdate({ _id: id }, elData, { new: true }).lean(),
          ),
        )
      }

      if (toCreate.length) {
        await Doc_el.insertMany(
          toCreate.map(({ id, create, ...elData }) => ({
            ...elData,
            doc_id: doc.id,
          })),
        )
      }

      if (toDelete.length) {
        await Doc_el.deleteMany({
          _id: { $in: toDelete.map(el => el.id) },
        })
      }
    }

    const docEls = await Doc_el.find({ doc_id: doc.id }).lean()
    res.status(200).send(mapDoc({ ...updatedDoc, elements: docEls.map(mapDocEl) }))
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

const deleteDocument = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

    const doc = await Document.findOne({ _id: req.params.id })

    if (!doc) return res.status(404).send({ error: 'Document not found' })

    if (!canDeleteDoc(req.user, doc)) return res.status(403).send({ error: 'Forbidden' })

    await Doc_el.deleteMany({ doc_id: doc.id })
    await Document.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

module.exports = {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
}
