/**
 * Удаление документа
 *
 * @param {number} id
 * @returns {error: string|null} - ошибка или null
 */
import { removeDoc } from '../api'

export const deleteDocument = id => removeDoc(id)
