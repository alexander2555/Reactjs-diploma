import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { selectUserId, selectUserRole } from '../../selectors'
import { removeDocAsync } from '../../actions'

import { Button, Loader } from '../../components'
import { DocCard } from './components'
import { MainLayout } from '../../layouts'

import { checkAccess, apiRequest } from '../../utils'

import { ROLE } from '../../constants'

import styles from './MainPage.module.sass'

export const MainPage = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const userId = useSelector(selectUserId)
  const roleId = useSelector(selectUserRole)
  const isCreator = useRef(false)

  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDocId, setSelectedDocId] = useState(null)
  const [isSelectedDocEditable, setIsSelectedDocEditable] = useState(false)
  const [isSelectedDocRemovable, setIsSelectedDocRemovable] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    isCreator.current = checkAccess([ROLE.ADMIN, ROLE.MASTER], roleId)

    setIsLoading(true)

    const initGallery = async () => {
      setSelectedDocId(null)
      try {
        const res = await apiRequest('documents')

        const docs = (res || [])
          .map(doc => {
            const isRemovable =
              checkAccess([ROLE.ADMIN], roleId) || doc.owner_id === userId
            const isEditable = isRemovable || doc.editor_id === userId
            if (isEditable || doc.public) {
              return {
                ...doc,
                editable: isEditable,
                removable: isRemovable,
              }
            }

            return null
          })
          .filter(Boolean)

        setError(null)
        setDocuments(docs)
      } catch (err) {
        setError(err.message)
        setDocuments([])
      } finally {
        setIsLoading(false)
      }
    }

    initGallery()
  }, [roleId, userId])

  const onDocCardSelect = id => {
    setSelectedDocId(id)
    const doc = documents.find(d => d.id === id)

    setIsSelectedDocEditable(doc.editable)
    setIsSelectedDocRemovable(doc.removable)
  }

  const onDocRemove = async () => {
    setIsLoading(true)
    const { err } = await dispatch(removeDocAsync(selectedDocId))

    setError(err)

    if (!err) {
      setDocuments(prev =>
        prev
          .filter(d => d.id !== selectedDocId)
          .map(d => ({
            ...d,
            editable:
              checkAccess([ROLE.ADMIN], roleId) ||
              d.owner_id === userId ||
              d.editor_id === userId,
            removable: checkAccess([ROLE.ADMIN], roleId) || d.owner_id === userId,
          })),
      )
      setSelectedDocId(null)
    }

    setIsSelectedDocEditable(false)
    setIsSelectedDocRemovable(false)

    setIsLoading(false)
  }

  if (error) console.warn(error)

  return (
    <MainLayout
      leftPanel={
        <>
          {isCreator.current && <Button onClick={() => nav('/document')}>Создать</Button>}
          {selectedDocId && (
            <Button to={`document/${selectedDocId}`} className={styles['btn-edit']}>
              {isSelectedDocEditable ? 'Редактировать' : 'Просмотреть'}
            </Button>
          )}
          {selectedDocId && isSelectedDocRemovable && (
            <Button className={styles['btn-del']} onClick={onDocRemove}>
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
            <Loader message='Загрузка галереи...' local={true} />
          ) : (
            <p>Галерея пуста{error && ` (Ошибка: ${error})`}</p>
          )}
        </ul>
      }
    />
  )
}
