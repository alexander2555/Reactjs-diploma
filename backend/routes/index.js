const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./auth'))
// router.use('/elements', require('./elements'))
// router.use('/documents', require('./documents'))
router.use('/users', require('./users'))

module.exports = router
