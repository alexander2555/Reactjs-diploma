const DocEl = require('../models/DocEl')

exports.getDocEls = async (req, res) => {
  const docEls = await DocEl.find().lean()
  res.send({ data: docEls })
}

exports.getDocElById = async (req, res) => {
  const docEl = await DocEl.findOne({ id: req.params.id }).lean()
  if (!docEl) return res.status(404).send({ error: 'DocEl not found' })
  res.send({ data: docEl })
}

exports.createDocEl = async (req, res) => {
  try {
    const docEl = await DocEl.create(req.body)
    res.status(201).send({ data: docEl })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.updateDocEl = async (req, res) => {
  try {
    const updated = await DocEl.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    res.send({ data: updated })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.deleteDocEl = async (req, res) => {
  try {
    await DocEl.findOneAndDelete({ id: req.params.id })
    res.send({ error: null })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

