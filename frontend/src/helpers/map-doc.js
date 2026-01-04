import { DEFAULT_DOC, DEFAULT_DOC_ELEMENT } from '../constants'

export const mapDoc = doc =>
  Object.keys(DEFAULT_DOC).reduce((acc, key) => {
    const val = doc?.[key]
    acc[key] = val !== undefined ? val : DEFAULT_DOC[key]
    return acc
  }, {})

export const mapDocElement = el =>
  Object.keys(DEFAULT_DOC_ELEMENT).reduce((acc, key) => {
    const val = el?.[key]
    acc[key] = val !== undefined ? val : DEFAULT_DOC_ELEMENT[key]
    return acc
  }, {})
