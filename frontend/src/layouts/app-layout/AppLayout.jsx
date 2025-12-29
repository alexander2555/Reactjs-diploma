import { useLayoutEffect } from 'react'
import { Outlet, useMatches } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Loader } from '../../components'
import { Header, Footer } from './components'

import { checkMeAsync } from '../../actions'
import { selectAuthData } from '../../selectors'

import styles from './AppLayout.module.sass'

export const AppLayout = () => {
  const dispatch = useDispatch()
  const pageMatch = useMatches().at(-1)

  const { isPending } = useSelector(selectAuthData)

  useLayoutEffect(() => {
    dispatch(checkMeAsync())
  }, [])

  if (isPending) {
    return <Loader message='Згрузка данных пользователя ...' />
  }

  return (
    <>
      <header className={styles.header}>
        <Header pageTitle={pageMatch.handle?.pageTitle} />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  )
}
