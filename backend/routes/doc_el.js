const express = require('express')
const auth = require('../middlewares/auth')
const optionalAuth = require('../middlewares/optional-auth')
const {
  getDocEls,
  createDocEl,
  updateDocEl,
  deleteDocEl,
} = require('../controllers/docEl')
const router = express.Router({ mergeParams: true })

router.get('/', optionalAuth, getDocEls)
router.post('/', auth, createDocEl)
router.patch('/:id', auth, updateDocEl)
router.delete('/:id', auth, deleteDocEl)

module.exports = router
