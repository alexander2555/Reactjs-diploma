import { createContext, useContext, useState } from 'react'

const ScaleContext = createContext()

export const useScale = () => {
  return useContext(ScaleContext)
}

export const ScaleProvider = ({ children }) => {
  const [scale, setScale] = useState(1)

  return <ScaleContext value={{ scale, setScale }}>{children}</ScaleContext>
}
