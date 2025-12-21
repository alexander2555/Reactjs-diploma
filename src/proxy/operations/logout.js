import { sessions } from '../sessions'

/**
 * Выход из системы
 */
export const logout = () => {
  sessions.remove()
}
