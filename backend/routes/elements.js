const express = require('express')
const { getElements, getElementById, createElement, updateElement, deleteElement } = require('../controllers/element')
const router = express.Router({ mergeParams: true })

router.get('/', getElements)
router.get('/:id', getElementById)
router.post('/', createElement)
router.patch('/:id', updateElement)
router.delete('/:id', deleteElement)

module.exports = router

