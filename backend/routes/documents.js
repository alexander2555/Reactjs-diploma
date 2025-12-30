const express = require('express')
const auth = require('../middlewares/auth')
const optionalAuth = require('../middlewares/optionalAuth')
const {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} = require('../controllers/document')
const router = express.Router({ mergeParams: true })

router.get('/', optionalAuth, getDocuments)
router.get('/:id', optionalAuth, getDocumentById)
router.post('/', auth, createDocument)
router.patch('/:id', auth, updateDocument)
router.delete('/:id', auth, deleteDocument)

module.exports = router
