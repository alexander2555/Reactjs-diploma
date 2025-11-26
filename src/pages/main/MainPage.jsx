import { useSelector, useStore } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '../../components'
import { MainLayout } from '../../layouts/MainLayout'
import { selectUserRole } from '../../selectors'

import styles from './MainPage.module.sass'

export const MainPage = () => {
  const roleId = useSelector(selectUserRole)

  const documents = useStore().getState().documents

  return (
    <MainLayout
      leftPanel={
        <>
          <Button>Создать</Button>
          <Button>Редактировать</Button>
          <span>{roleId === 3 ? 'Гость' : `${roleId}`}</span>
          <Button className={styles['btn-del']}>Удалить</Button>
        </>
      }
      mainContent={
        <div className={styles['document-list']}>
          {documents.map(({ id, title }) => (
            <Link
              key={id}
              className={styles['document-item']}
              to={`collage/${id}`}
            >
              {title}
            </Link>
          ))}
        </div>
      }
    />
  )
}
