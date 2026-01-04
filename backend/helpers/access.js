const ROLES = require('../constants/roles')

const isAdmin = user => user && user.role_id === ROLES.ADMIN
const isMaster = user => user && user.role_id === ROLES.MASTER
const isEditor = user => user && user.role_id === ROLES.EDITOR

function canCreateDoc(user) {
  return isAdmin(user) || isMaster(user)
}

function canViewDoc(user, doc) {
  if (!doc) return false
  if (doc.public) return true
  if (isAdmin(user)) return true
  if (!user) return false
  if (isMaster(user) && doc.owner_id === user.id) return true
  if (isEditor(user) && doc.editor_id === user.id) return true
  return false
}

function canEditDoc(user, doc) {
  if (!doc) return false
  if (isAdmin(user)) return true
  if (!user) return false
  if (isMaster(user) && doc.owner_id === user.id) return true
  if (isEditor(user) && doc.editor_id === user.id) return true
  return false
}

function canDeleteDoc(user, doc) {
  if (!doc) return false
  if (isAdmin(user)) return true
  if (!user) return false
  if (isMaster(user) && doc.owner_id === user.id) return true
  return false
}

function canAssignRights(user, doc) {
  if (!doc) return false
  if (isAdmin(user)) return true
  if (!user) return false
  if (isMaster(user) && doc.owner_id === user.id) return true
  return false
}

function canCreateElement(user) {
  return !!user && [ROLES.ADMIN, ROLES.MASTER, ROLES.EDITOR].includes(user.role_id)
}

function canViewElement(user, el) {
  if (!el) return false
  if (isAdmin(user)) return true
  if (!user) return false
  if (isMaster(user) && (el.public || el.owner_id === user.id)) return true
  if (isEditor(user) && (el.public || el.owner_id === user.id)) return true
  return false
}

function canUseElement(user, el) {
  return canViewElement(user, el)
}

function canEditElement(user, el) {
  if (!el) return false
  if (isAdmin(user)) return true
  if (!user) return false
  if (isMaster(user) && el.owner_id === user.id) return true
  if (isEditor(user) && el.owner_id === user.id) return true
  return false
}

function canDeleteElement(user, el) {
  if (!el) return false
  if (isAdmin(user)) return true
  if (!user) return false
  if (isMaster(user) && el.owner_id === user.id) return true
  if (isEditor(user) && el.owner_id === user.id) return true
  return false
}

module.exports = {
  isAdmin,
  isMaster,
  isEditor,
  canCreateDoc,
  canViewDoc,
  canEditDoc,
  canDeleteDoc,
  canAssignRights,
  canCreateElement,
  canViewElement,
  canUseElement,
  canEditElement,
  canDeleteElement,
}
