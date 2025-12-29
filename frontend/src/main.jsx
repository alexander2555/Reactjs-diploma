import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { createAppStore } from './store'
import { router } from './router'

import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={createAppStore()}>
    <RouterProvider router={router} />
  </Provider>,
)
