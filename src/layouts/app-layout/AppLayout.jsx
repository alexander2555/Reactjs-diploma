import { useLayoutEffect, useState } from 'react'
import { Outlet, useMatches } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Loader } from '../../components'
import { Header, Footer } from './components'

import { setSession } from '../../actions'

import { proxy } from '../../proxy'

import styles from './AppLayout.module.sass'

export const AppLayout = () => {
  const dispatch = useDispatch()
  const pageMatch = useMatches().at(-1)

  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    proxy.me().then(({ err, res }) => {
      if (err) {
        console.warn(err)
      }
      if (res) {
        dispatch(setSession(res))
      }

      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <Loader message='Згрузка данных пользователя' />
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
