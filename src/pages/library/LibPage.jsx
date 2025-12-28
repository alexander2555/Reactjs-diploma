import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Input, Loader } from '../../components'
import { GraphicsItem } from './components'
import { MainLayout } from '../../layouts'

import { selectGraphicsLib, selectUserId, selectUserRole } from '../../selectors'

// import { LibEnvProvider, useSelectLibEl } from '../../providers'

import {
  graphicsLoadAsync,
  graphicsUploadAsync,
  graphicsRemoveAsync,
} from '../../actions'

import { getDocEl } from '../../proxy/api'

import styles from './LibPage.module.sass'

export const LibPage = () => {
  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)

  const graphicsLib = useSelector(selectGraphicsLib)

  const [selectedElId, setSelectedElId] = useState(null)
  const [selectedGraphicsFile, setSelectedGraphicsFile] = useState(null)
  const [selectedPreview, setselectePreview] = useState(null)
  const [publicEl, setPublicEl] = useState(false)

  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let isCancelled = false

    setLoading('Загрузка графики ...')
    dispatch(graphicsLoadAsync(isCancelled)).then(({ err }) => {
      setError(err)
      setLoading('')
    })

    return () => {
      isCancelled = true
    }
  }, [])

  const handleFileSelect = ({ target }) => {
    const file = target.files[0]

    if (!file.type.match('image/(png|jpg|jpeg)')) {
      setError(
        'Выбранный файл не соответствует требуемому формату. Выберите PNG или JPG файл',
      )
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => setselectePreview(reader.result)
    reader.readAsDataURL(file)

    setSelectedGraphicsFile(file)
  }

  const handleUpload = async () => {
    if (!selectedGraphicsFile) return

    const elData = {
      image_url: selectedPreview,
      owner_id: userId,
      public: publicEl,
    }

    console.log(elData)
    setLoading('Добавление элемента графики ...')
    const { err } = await dispatch(graphicsUploadAsync(elData))

    setSelectedGraphicsFile(null)

    setError(err)
    setLoading('')
  }

  // Выделение элемента графики и проверка на возможность удаления
  const [unRemovable, setUnRemovable] = useState(true)

  const handleSelect = async id => {
    setSelectedElId(id)
    setUnRemovable(true)

    const selectedEl = graphicsLib.find(el => el.id === id)
    const docElements = await getDocEl(id)
    const isUsed = docElements?.length
    const canRemove = userId === selectedEl.owner_id || selectedEl.public

    setUnRemovable(isUsed || !canRemove)
  }

  const handleDelete = async () => {
    setSelectedElId(null)
    setUnRemovable(true)

    setLoading('Удаление ...')
    const { err } = await dispatch(graphicsRemoveAsync(selectedElId))

    setError(err)
    setLoading('')
  }

  if (error) console.warn(error)

  return (
    <MainLayout
      leftPanel={
        <>
          <div
            className={styles['input-group-file']}
            data-file={selectedGraphicsFile?.name}
          >
            <strong>Добавить в библиотеку</strong>
            <Input
              label={selectedGraphicsFile ? 'Выбрать другой файл' : 'Выбрать файл'}
              type='file'
              name='file-upload'
              className={styles['input-file']}
              accept='image/png, image/jpeg'
              onChange={handleFileSelect}
              disabled={!!loading}
            />
            {!loading && selectedGraphicsFile && (
              <>
                <img
                  src={selectedPreview}
                  alt={selectedGraphicsFile?.name}
                  className={styles['img-preview']}
                />
                <Button className={styles['btn-upload']} onClick={handleUpload}>
                  Загрузить
                </Button>
                <div>
                  <Input
                    type='checkbox'
                    label='публичный'
                    className={styles['input-public']}
                    checked={publicEl}
                    onChange={() => {
                      setPublicEl(prev => !prev)
                    }}
                  />
                </div>
              </>
            )}
          </div>
          {!!selectedElId && (
            <Button
              className={styles['btn-del']}
              onClick={handleDelete}
              disabled={unRemovable}
            >
              Удалить
            </Button>
          )}
        </>
      }
      mainContent={
        loading ? (
          <Loader message={loading} />
        ) : (
          <div className={styles['graphics-list']}>
            {graphicsLib.length ? (
              graphicsLib.map(({ id, image_url, description }) => (
                <GraphicsItem
                  key={id}
                  imgSrc={image_url}
                  descr={description}
                  onSelect={() => handleSelect(id)}
                  selected={selectedElId === id}
                />
              ))
            ) : (
              <p>Библиотека пуста</p>
            )}
          </div>
        )
      }
    />
  )
}
