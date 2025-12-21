import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts'
import { AuthPage, MainPage, DocumentPage, RegPage, LibPage } from './pages'

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
        Component: DocumentPage,
        handle: { pageTitle: 'Новый коллаж' },
        children: [
          {
            path: ':id',
            Component: DocumentPage,
            handle: { pageTitle: '' },
          },
        ],
      },
      {
        path: 'library',
        Component: LibPage,
        handle: { pageTitle: 'Библиотека' },
      },
      {
        path: '*',
        Component: <div>404 Not Found</div>,
        handle: { pageTitle: '404' },
      },
    ],
  },
])
