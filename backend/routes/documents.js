const express = require('express')
const { getDocuments, getDocumentById, createDocument, updateDocument, deleteDocument } = require('../controllers/document')
const router = express.Router({ mergeParams: true })

router.get('/', getDocuments)
router.get('/:id', getDocumentById)
router.post('/', createDocument)
router.patch('/:id', updateDocument)
router.delete('/:id', deleteDocument)

module.exports = router

