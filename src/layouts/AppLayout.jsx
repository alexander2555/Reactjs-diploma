import { Outlet, useMatches } from 'react-router-dom'
import { Header, Footer } from '../components'

import styles from './AppLayout.module.sass'

export const AppLayout = () => {
  const matches = useMatches()

  return (
    <>
      <header className={styles.header}>
        <Header pageTitle={matches.at(-1).handle?.pageTitle || ''} />
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
