import { useContext, useState } from 'react'

import { SelectContext } from '../context'

export const useSelect = () => {
  return useContext(SelectContext)
}

export const SelectProvider = ({ children }) => {
  // Выделение элементов
  const [selectedEl, setSelectedEl] = useState(null)

  return <SelectContext value={{ selectedEl, setSelectedEl }}>{children}</SelectContext>
}
