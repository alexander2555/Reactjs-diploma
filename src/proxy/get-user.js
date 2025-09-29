import { getUsers } from './get-users.js'

export const getUser = async userLogin => {
  const users = await getUsers()
  return users.find(u => u.login === userLogin)
}
