import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  graphicsLoadAsync,
  graphicsRemoveAsync,
  graphicsUploadAsync,
} from '../../../../actions'
import { selectUserId } from '../../../../selectors'

import { Button, Input } from '../../../../components'

import { useLibrary, useSelectEl } from '../../../../providers'

import styles from '../../LibPage.module.sass'

export const LeftPanel = () => {
  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)

  const [publicEl, setPublicEl] = useState(false)
  const [selectedGraphicsFile, setSelectedGraphicsFile] = useState(null)
  const [selectedPreview, setselectePreview] = useState(null)

  const { libLoading, setLibLoading, setLibError, removable, setRemovable } = useLibrary()
  const { selectedEl, setSelectedEl } = useSelectEl()

  useEffect(() => {
    let isCancelled = false

    setLibLoading('Загрузка графики ...')
    dispatch(graphicsLoadAsync(isCancelled)).then(({ err }) => {
      setLibError(err)
      setLibLoading('')
    })

    return () => {
      isCancelled = true
    }
  }, [])

  const handleFileSelect = ({ target }) => {
    const file = target.files[0]

    if (!file.type.match('image/(png|jpg|jpeg)')) {
      setLibError(
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

    setLibLoading('Добавление элемента графики ...')
    const { err } = await dispatch(graphicsUploadAsync(elData))

    setSelectedGraphicsFile(null)

    setLibError(err)
    setLibLoading('')
  }

  // проверка на возможность удаления
  const handleDelete = async () => {
    setSelectedEl(null)
    setRemovable(false)

    setLibLoading('Удаление ...')
    const { err } = await dispatch(graphicsRemoveAsync(selectedEl))

    setLibError(err)
    setLibLoading('')
  }

  return (
    <>
      <div className={styles['input-group-file']} data-file={selectedGraphicsFile?.name}>
        <strong>Добавить в библиотеку</strong>
        <Input
          label={selectedGraphicsFile ? 'Выбрать другой файл' : 'Выбрать файл'}
          type='file'
          name='file-upload'
          className={styles['input-file']}
          accept='image/png, image/jpeg'
          onChange={handleFileSelect}
          disabled={!!libLoading}
        />
        {!libLoading && selectedGraphicsFile && (
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
      {!!selectedEl && (
        <Button
          className={styles['btn-del']}
          onClick={handleDelete}
          disabled={!removable}
        >
          Удалить
        </Button>
      )}
    </>
  )
}
