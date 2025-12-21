import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Loader } from '../../components'
import { DocCard } from './components'
import { MainLayout } from '../../layouts'

import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors'
import { removeDocAsync } from '../../actions'
import { proxy } from '../../proxy'
import { checkAccess } from '../../utils/check-access'

import { ROLE } from '../../constants'

import styles from './MainPage.module.sass'

export const MainPage = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const roleId = useSelector(selectUserRole)

  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDocId, setSelectedDocId] = useState(null)
  const [isSelectedDocEditable, setIsSelectedDocEditable] = useState(false)
  const [isSelectedDocRemovable, setIsSelectedDocRemovable] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsLoading(true)

    const initGallery = async () => {
      const { err, res } = await proxy.fetchDocs()

      setError(err)

      setDocuments(res || [])
    }

    initGallery()

    setIsLoading(false)
  }, [roleId])

  const onDocCardSelect = id => {
    setSelectedDocId(id)
    const doc = documents.find(d => d.id === id)

    setIsSelectedDocEditable(doc.editable)
    setIsSelectedDocRemovable(doc.removable)
  }

  const onDocRemove = async () => {
    setIsLoading(true)
    const { err, res: newDocsList } = await dispatch(
      removeDocAsync(selectedDocId),
    )

    setError(err)

    if (!err) {
      setDocuments(newDocsList)
      setSelectedDocId(null)
    }

    setIsLoading(false)
  }

  if (error) console.warn(error)

  const isCreator = checkAccess([ROLE.ADMIN, ROLE.MASTER], roleId)

  return (
    <MainLayout
      leftPanel={
        <>
          {isCreator && (
            <Button onClick={() => nav('/document')}>Создать</Button>
          )}
          {selectedDocId && isSelectedDocEditable && (
            <Button
              to={`document/${selectedDocId}`}
              className={styles['btn-edit']}
            >
              Редактировать
            </Button>
          )}
          {selectedDocId && isSelectedDocRemovable && (
            <Button
              className={styles['btn-del']}
              onClick={onDocRemove}
            >
              Удалить
            </Button>
          )}
        </>
      }
      mainContent={
        <ul className={styles['documents-list']}>
          {!isLoading && documents.length ? (
            documents.map(({ id, ...docData }) => (
              <DocCard
                key={id}
                onCardClick={() => onDocCardSelect(id)}
                docData={docData}
                styles={styles}
                selected={selectedDocId === id}
              />
            ))
          ) : isLoading ? (
            <Loader
              message={'Загрузка...'}
              local={true}
            />
          ) : (
            <p>Галерея пуста</p>
          )}
        </ul>
      }
    />
  )
}
