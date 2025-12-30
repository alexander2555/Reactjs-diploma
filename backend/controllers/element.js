const Element = require('../models/Element')
const DocEl = require('../models/DocEl')
const {
  canCreateElement,
  canViewElement,
  canEditElement,
  canDeleteElement,
} = require('../helpers/access')

// REFACTOR: проверки прав на действия с элементами
exports.getElements = async (req, res) => {
  if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

  const elements = await Element.find().lean()
  const filtered = elements.filter((el) => canViewElement(req.user, el))

  res.send({ data: filtered })
}

exports.getElementById = async (req, res) => {
  if (!req.user) return res.status(401).send({ error: 'Unauthorized' })

  const el = await Element.findOne({ id: req.params.id }).lean()
  if (!el) return res.status(404).send({ error: 'Element not found' })
  if (!canViewElement(req.user, el))
    return res.status(403).send({ error: 'Forbidden' })

  res.send({ data: el })
}

exports.createElement = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })
    if (!canCreateElement(req.user))
      return res.status(403).send({ error: 'Forbidden' })

    const payload = {
      ...req.body,
      owner_id: req.user.id,
      public: !!req.body.public,
    }

    const el = await Element.create(payload)
    res.status(201).send({ data: el })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.updateElement = async (req, res) => {
  try {
    const el = await Element.findOne({ id: req.params.id })
    if (!el) return res.status(404).send({ error: 'Element not found' })
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })
    if (!canEditElement(req.user, el))
      return res.status(403).send({ error: 'Forbidden' })

    const update = {}
    if (req.body.title !== undefined) update.title = req.body.title
    if (req.body.description !== undefined)
      update.description = req.body.description
    if (req.body.image_url !== undefined) update.image_url = req.body.image_url
    if (req.body.public !== undefined) update.public = req.body.public

    const updated = await Element.findOneAndUpdate(
      { id: req.params.id },
      update,
      { new: true }
    )
    res.send({ data: updated })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.deleteElement = async (req, res) => {
  try {
    const el = await Element.findOne({ id: req.params.id })
    if (!el) return res.status(404).send({ error: 'Element not found' })
    if (!req.user) return res.status(401).send({ error: 'Unauthorized' })
    if (!canDeleteElement(req.user, el))
      return res.status(403).send({ error: 'Forbidden' })

    const used = await DocEl.findOne({ el_id: req.params.id })
    if (used)
      return res.status(400).send({ error: 'Element is used in document' })

    await Element.deleteOne({ id: req.params.id })
    res.send({ error: null })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}
