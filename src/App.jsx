import { Route, Routes } from 'react-router-dom'
import { Header, Footer } from './components'
import { Auth } from './pages'
import styles from './app.module.sass'

const Content = ({ children }) => <main className={styles.content}>{children}</main>

export const App = () => {
  return (
    <>
      <Header className={styles.header} pageTitle='Header Page Title' />
      <Content>
        <Routes>
          <Route path='/' element={<div>Home content</div>} />
          <Route path='/login' element={<Auth />} />
          <Route path='/register' element={<div>Register</div>} />
          <Route path='/document' element={<div>Doc content</div>} />
          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
      </Content>
      <Footer className={styles.footer} />
    </>
  )
}
