import { useContext, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { DocumentContext, SelectContext } from '../context'

import { useInitDoc } from '../hooks/useInitDoc'

export const useDocEnvironment = () => {
  return useContext(DocumentContext)
}

export const useSelectEl = () => {
  return useContext(SelectContext)
}

export const DocEnvProvider = ({ children }) => {
  const docId = useParams().id

  const stageRef = useRef(null)
  const libRef = useRef({})
  const draggingImgRef = useRef(null)

  // Инициализация библиотеки и холста документа
  const { isLoading, lib, error } = useInitDoc(docId)

  // Выделение элементов
  const [selectedEl, setSelectedEl] = useState(null)

  if (error.length) error.forEach(e => console.warn(e))

  return (
    <DocumentContext value={{ lib, stageRef, libRef, draggingImgRef, isLoading }}>
      <SelectContext value={{ selectedEl, setSelectedEl }}>{children}</SelectContext>
    </DocumentContext>
  )
}
