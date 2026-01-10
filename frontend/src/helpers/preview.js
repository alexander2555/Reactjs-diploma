import Konva from 'konva'

/**
 * Генератор превью документа
 *
 * @param {object[]} elements - массив элементов документа
 * @param {object} docSize - размеры холста
 * @param {array} graphicsLib - библиотека графики
 *
 * @returns {string} превью (base64)
 */
export const generatePreview = async (elements, docSize, canvasColor) => {
  const PREVIEW_SIZE = 320
  // масштабирование относительно размера холста
  const scale = PREVIEW_SIZE / Math.max(docSize.width || 1, docSize.height || 1)

  // контейнер для stage
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.visibility = 'hidden'
  container.style.top = `-${PREVIEW_SIZE}px`
  document.body.appendChild(container)

  const stage = new Konva.Stage({
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    container,
  })

  const layer = new Konva.Layer()
  stage.add(layer)

  layer.add(
    new Konva.Rect({
      x: 0,
      y: 0,
      width: PREVIEW_SIZE,
      height: PREVIEW_SIZE,
      fill: canvasColor || 'white',
    }),
  )

  await Promise.all(
    elements.map(async el => {
      // DOM элемент img для canvas
      const img = await new Promise((resolve, reject) => {
        const _img = new window.Image()
        _img.crossOrigin = 'anonymous'
        _img.onload = () => resolve(_img)
        _img.onerror = reject
        _img.src = el.imageUrl
      })
      const { x = 0, y = 0 } = el.position || {}
      const { width = 50, height = 50 } = el.size || {}
      const konvaImg = new Konva.Image({
        image: img,
        x: x * scale,
        y: y * scale,
        width: width * scale,
        height: height * scale,
        rotation: el.rotation,
      })
      layer.add(konvaImg)
    }),
  )

  layer.draw()

  const dataUrl = stage.toDataURL({
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    pixelRatio: 1,
  })

  stage.destroy()
  document.body.removeChild(container)

  return dataUrl
}
