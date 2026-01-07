const express = require('express')

const auth = require('../middlewares/auth')

const {
  getDocEls,
  createDocEl,
  updateDocEl,
  deleteDocEl,
} = require('../controllers/docEl')
const router = express.Router({ mergeParams: true })

router.get('/', getDocEls)
router.post('/', auth, createDocEl)
router.patch('/:id', auth, updateDocEl)
router.delete('/:id', auth, deleteDocEl)

module.exports = router
