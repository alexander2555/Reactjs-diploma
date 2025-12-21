import { Provider } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { createAppStore } from './store'

import { AppLayout } from './layouts'

export const AppRoot = () => {
  const navigate = useNavigate()

  return (
    <Provider store={createAppStore(navigate)}>
      <AppLayout />
    </Provider>
  )
}
