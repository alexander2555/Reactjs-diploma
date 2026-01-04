const Element = require('../models/Element')
const Doc_el = require('../models/Doc_el')
const {
  canCreateElement,
  canViewElement,
  canEditElement,
  canDeleteElement,
} = require('../helpers/access')

const { mapEl } = require('../helpers/map')

const getElements = async (req, res) => {
  // if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

  const elements = await Element.find().lean()
  // const filtered = elements.filter((el) => canViewElement(req.user, el))

  res.status(200).send(elements.map(mapEl))
}

const getElementById = async (req, res) => {
  if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

  const el = await Element.findOne({ _id: req.params.id }).lean()

  if (!el) return res.status(404).send({ error: 'Element not found' })

  if (!canViewElement(req.user, el)) return res.status(403).send({ error: 'Forbidden' })

  res.status(200).send(mapEl(el))
}

const createElement = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

    if (!canCreateElement(req.user)) return res.status(403).send({ error: 'Forbidden' })

    const newEl = await Element.create({
      ...req.body,
      owner_id: req.user.id,
    })

    res.status(201).send(mapEl(newEl.toObject()))
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

const updateElement = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

    const el = await Element.findOne({ _id: req.params.id })

    if (!el) return res.status(404).send({ error: 'Element not found' })

    if (!canEditElement(req.user, el)) return res.status(403).send({ error: 'Forbidden' })

    const updatedEl = await Element.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
    res.status(200).send(mapEl(updatedEl.toObject()))
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

const deleteElement = async (req, res) => {
  try {
    const el = await Element.findOne({ _id: req.params.id })

    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

    if (!el) return res.status(404).send({ error: 'Element not found' })

    if (!canDeleteElement(req.user, el))
      return res.status(403).send({ error: 'Forbidden' })

    const isUsed = await Doc_el.findOne({ el_id: req.params.id })
    if (isUsed) return res.status(400).send({ error: 'Element is used' })

    await Element.deleteOne({ _id: req.params.id })

    res.status(204).send()
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

module.exports = {
  getElements,
  getElementById,
  createElement,
  updateElement,
  deleteElement,
}
