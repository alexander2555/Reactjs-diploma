const express = require('express')
const auth = require('../middlewares/auth')
const {
  getElements,
  getElementById,
  createElement,
  updateElement,
  deleteElement,
} = require('../controllers/element')
const router = express.Router({ mergeParams: true })

router.get('/', auth, getElements)
router.get('/:id', auth, getElementById)
router.post('/', auth, createElement)
router.patch('/:id', auth, updateElement)
router.delete('/:id', auth, deleteElement)

module.exports = router
