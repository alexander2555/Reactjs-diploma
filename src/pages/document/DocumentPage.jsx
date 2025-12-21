import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setDocChanged, setDocPublicStatus } from '../../actions'
import { selectDocument } from '../../selectors'

import { MainLayout } from '../../layouts'

import { Button, Icon, ImgItem, Input, Loader } from '../../components'

import { useInitDoc } from '../../hooks/useInitDoc'

import styles from './DocumentPage.module.sass'

export const DocumentPage = () => {
  const dispatch = useDispatch()
  const doc = useSelector(selectDocument)

  const docId = useParams().id

  const canvasRef = useRef(null)
  const libRef = useRef({})

  // Инициализация бок. панели и холста
  const { isLoading, lib, error } = useInitDoc(docId)

  // Масштаб
  const [scale, setScale] = useState(1)

  const docDraw = useCallback(
    ctx => {
      doc.elements.forEach(el => {
        const {
          position: { x, y },
          size: { width, height },
          el_id: id,
        } = el
        // Получаем img
        const image = libRef.current[id]

        // Выводим контуры
        ctx.strokeRect(x, y, width, height)

        const onLoadImage = img =>
          ctx.drawImage(img, 0, 0, width, height, x, y, width, height)

        // Если есть картинка, то:
        if (image)
          image.onload = image.complete
            ? // если уже загружена {complete} - выводим картинку сразу
              onLoadImage(image)
            : // или по завершению загрузки {onload}
              () => onLoadImage(image)
      })
    },
    [doc],
  )

  useEffect(() => {
    // Получение DOM-элемента canvas по рефу и контекста для рисования
    const canvas = canvasRef.current
    if (!canvas) {
      console.warn('Canvas not found in DOM!')
      return
    }

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    /**
     * Обработчик ResizeObserver
     */
    const onResize = entries => {
      // Получение актуальных размеров для canvas с учетом dpr устройства
      /**
       * TODO: Нужно ли умножать на dpr ??
       */
      const canvasWidth = Math.floor(entries[0].contentRect.width)
      const canvasHeight = Math.floor(entries[0].contentRect.height)

      // Если размеры уже актуальны, ничего не делаем
      if (canvas.width === canvasWidth && canvas.height === canvasHeight) return

      // Установка актуальных размеров
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      ctx.scale(dpr * scale, dpr * scale)

      // Очистка холста
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      // Отрисовка
      docDraw(ctx)
    } /* /onResize */

    const resizeObserver = new ResizeObserver(onResize)

    resizeObserver.observe(canvas)

    /** willUnmount */
    return () => {
      if (resizeObserver) resizeObserver.disconnect()
    }
    /** Unmount */
  }, [doc, docDraw])

  useEffect(() => {
    // Получение DOM-элемента canvas по рефу и контекста для рисования
    const canvas = canvasRef.current
    if (!canvas) {
      console.warn('Canvas not found in DOM!')
      return
    }

    const ctx = canvas.getContext('2d')

    ctx.scale(scale, scale)

    docDraw(ctx)
  }, [scale])

  if (error.length) error.forEach(e => console.warn(e))

  return (
    <MainLayout
      leftPanel={
        <>
          <Button to={'/library'}>Библиотека</Button>
          {!isLoading && lib && lib.length ? (
            <ul className={styles['elements-list']}>
              {lib.map(({ id, ...elData }) => (
                <ImgItem
                  key={id}
                  className={styles['elements-item']}
                  el={elData}
                  ref={img => (libRef.current[id] = img)}
                />
              ))}
            </ul>
          ) : isLoading ? (
            <Loader content='Загрузка' />
          ) : (
            <div>Нет элементов</div>
          )}
        </>
      }
      mainContent={
        isLoading ? (
          <Loader local={true} message={'Загрузка'} />
        ) : (
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            onWheel={({ deltaY }) =>
              setScale(ps => Number((ps + deltaY / 1000).toFixed(1)))
            }
          >
            Reserved content for unsupperted browsers
          </canvas>
        )
      }
      rightPanel={
        <>
          <Input
            className={styles['input-scale']}
            label={<Icon iconName='maximize' />}
            value={scale}
            onChange={({ target }) => setScale(Number(target.value.toFixed(1)))}
          />
          <Input
            type='checkbox'
            label='Опубликовать'
            checked={doc.public}
            onChange={() => {
              dispatch(setDocPublicStatus(!doc.public))
              if (!doc.changed) dispatch(setDocChanged())
            }}
          />
        </>
      }
    />
  )
}
