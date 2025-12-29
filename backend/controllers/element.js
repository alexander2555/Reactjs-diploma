const Element = require('../models/Element')

exports.getElements = async (req, res) => {
  const elements = await Element.find().lean()
  res.send({ data: elements })
}

exports.getElementById = async (req, res) => {
  const el = await Element.findOne({ id: req.params.id }).lean()
  if (!el) return res.status(404).send({ error: 'Element not found' })
  res.send({ data: el })
}

exports.createElement = async (req, res) => {
  try {
    const el = await Element.create(req.body)
    res.status(201).send({ data: el })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.updateElement = async (req, res) => {
  try {
    const updated = await Element.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    res.send({ data: updated })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.deleteElement = async (req, res) => {
  try {
    await Element.findOneAndDelete({ id: req.params.id })
    res.send({ error: null })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

