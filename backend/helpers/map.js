exports.mapUser = ({ _id, login, role_id }) => {
  return { id: _id, login, roleId: role_id }
}

exports.mapDoc = ({ _id, __v, ...props }) => {
  return { id: _id, ...props }
}

exports.mapEl = ({ _id, __v, ...props }) => {
  return { id: _id, ...props }
}

exports.mapDocEl = ({ _id, doc_id, __v, ...props }) => {
  return { id: _id, ...props }
}
