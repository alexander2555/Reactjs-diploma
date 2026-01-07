import { useContext, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { DocumentContext, SelectContext } from '../context'

import { useInitDoc } from '../hooks'

export const useDocEnvironment = () => {
  return useContext(DocumentContext)
}

export const useSelectEl = () => {
  return useContext(SelectContext)
}

export const DocEnvProvider = ({ children }) => {
  const docId = useParams().id

  const stageRef = useRef(null)
  const draggingImgRef = useRef(null)

  // Инициализация библиотеки и холста документа
  const { isLoading, error } = useInitDoc(docId)

  // Выделение элементов
  const [selectedEl, setSelectedEl] = useState(null)

  return (
    <DocumentContext value={{ stageRef, draggingImgRef, isLoading, error }}>
      <SelectContext value={{ selectedEl, setSelectedEl }}>{children}</SelectContext>
    </DocumentContext>
  )
}
