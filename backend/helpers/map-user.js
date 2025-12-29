module.exports = function mapUser({ id, login, role }) {
  return { id, login, roleId: role }
}
