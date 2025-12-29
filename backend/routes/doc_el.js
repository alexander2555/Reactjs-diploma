const express = require('express')
const { getDocEls, getDocElById, createDocEl, updateDocEl, deleteDocEl } = require('../controllers/docEl')
const router = express.Router({ mergeParams: true })

router.get('/', getDocEls)
router.get('/:id', getDocElById)
router.post('/', createDocEl)
router.patch('/:id', updateDocEl)
router.delete('/:id', deleteDocEl)

module.exports = router

