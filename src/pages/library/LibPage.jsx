import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../../components'
import { MainLayout } from '../../layouts'
import { selectUserRole } from '../../selectors'
import { proxy } from '../../proxy'

import styles from './LibPage.module.sass'

export const LibPage = () => {
  const roleId = useSelector(selectUserRole)

  const [graphics, setGraphics] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    proxy.fetchElements().then(({ err, res }) => {
      setError(err)

      setGraphics(res || [])
    })
  }, [])

  if (error) console.log(error)

  return (
    <MainLayout
      leftPanel={
        <>
          <Button>Загрузить</Button>
          <span>{roleId === 3 ? 'Гость' : `${roleId}`}</span>
          <Button className={styles['btn-del']}>Удалить</Button>
        </>
      }
      mainContent={
        <div className={styles['document-list']}>
          {graphics.length ? (
            graphics.map(({ id, image_url, description }) => (
              <div key={id}>
                <img
                  src={image_url}
                  alt={description}
                />
              </div>
            ))
          ) : (
            <p>Библиотека пуста</p>
          )}
        </div>
      }
    />
  )
}
