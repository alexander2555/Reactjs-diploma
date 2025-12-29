import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './layouts'
import { AuthPage, MainPage, DocumentPage, RegPage, LibPage, NotFound } from './pages'
import { ProtectedRoute } from './components'
import { ROLE } from './constants'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: MainPage,
        handle: { pageTitle: 'Галерея' },
      },
      {
        path: 'login',
        Component: AuthPage,
        handle: { pageTitle: 'Аутентификация' },
      },
      {
        path: 'register',
        Component: RegPage,
        handle: { pageTitle: 'Регистрация' },
      },
      {
        path: 'document',
        children: [
          {
            index: true,
            Component: () => (
              <ProtectedRoute requireRoles={[ROLE.ADMIN, ROLE.MASTER]}>
                <DocumentPage />
              </ProtectedRoute>
            ),
            handle: { pageTitle: 'Новый коллаж' },
          },
          {
            path: ':id',
            Component: DocumentPage,
            handle: { pageTitle: '' },
          },
        ],
      },
      {
        path: 'library',
        Component: () => (
          <ProtectedRoute>
            <LibPage />
          </ProtectedRoute>
        ),
        handle: { pageTitle: 'Библиотека' },
      },
      {
        path: '*',
        Component: NotFound,
        handle: { pageTitle: '404' },
      },
    ],
  },
])
