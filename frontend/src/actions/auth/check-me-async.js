import { setPending, setSession } from '.'

import { apiRequest } from '../../utils'
import { mapUser } from '../../helpers'

export const checkMeAsync = () => async dispatch => {
  dispatch(setPending(true))
  try {
    const res = await apiRequest('me')

    if (res) {
      const user = mapUser(res)
      dispatch(setSession(user))
    }
  } catch (err) {
    console.warn('[ACTIONS] Me', err.message)
  } finally {
    dispatch(setPending(false))
  }
}
