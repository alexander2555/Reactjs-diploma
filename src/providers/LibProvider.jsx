import { useContext, useState } from 'react'
import { LibContext } from '../context'

export const useLibrary = () => {
  return useContext(LibContext)
}

export const LibProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  if (error) console.warn(error)

  return <LibContext value={{ isLoading }}>{children}</LibContext>
}
