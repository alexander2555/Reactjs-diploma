import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { AuthPage, MainPage, DocumentPage } from './pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
        handle: { pageTitle: 'Главная' },
      },
      {
        path: '/login',
        element: <AuthPage />,
        handle: { pageTitle: 'Аутентификация' },
      },
      {
        path: '/register',
        element: <div>Register</div>,
        handle: { pageTitle: 'Регистрация' },
      },
      {
        path: '/collage/:id',
        element: <DocumentPage />,
        handle: { pageTitle: 'Коллаж' },
      },
      {
        path: '*',
        element: <div>404 Not Found</div>,
        handle: { pageTitle: '404' },
      },
    ],
  },
])
