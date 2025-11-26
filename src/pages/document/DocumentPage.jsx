import { Button } from '../../components'
import { MainLayout } from '../../layouts/MainLayout'

import styles from './DocumentPage.module.sass'

export const DocumentPage = () => {
  return (
    <MainLayout
      leftPanel={
        <>
          <Button>Библиотека</Button>
        </>
      }
      mainContent={<canvas className={styles.canvas} />}
    />
  )
}
