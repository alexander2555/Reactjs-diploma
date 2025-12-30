// интеграция: прежний поиск по локальному списку
// export const getUser = async userLogin => {
//   const users = await getUsers()
//   return users.find(u => u.login === userLogin)
// }

import { getUsers } from './get-users.js'

export const getUser = async userLogin => {
  const users = await getUsers()
  const found = users.find(u => u.login === userLogin)

  if (!found) return null

  // интеграция: выравнивание полей под старый контракт
  return {
    ...found,
    role_id: found.role_id ?? found.roleId,
  }
}
