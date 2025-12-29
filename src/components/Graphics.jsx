import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectDocument } from '../selectors'
import { setDocData } from '../actions'

import useImage from 'use-image'
import { Image, Rect, Transformer } from 'react-konva'

import { snap } from '../utils'

export const Graphics = ({ element, libRef, isSelected, onSelect, imgUrl }) => {
  const dispatch = useDispatch()

  const elRef = useRef(null)
  const transformerRef = useRef(null)

  const doc = useSelector(selectDocument)

  const {
    position: { x, y },
    size: { width, height },
    el_id,
    id,
  } = element

  const img = libRef.current[el_id]
  // резервный <img>, если елемент библиотеки недоступен пользователю и не загружен
  const [reservImg] = useImage(imgUrl, 'anonymous')

  const handleElDragStart = () => {
    onSelect()
  }
  const handleElDragEnd = () => {
    dispatch(
      setDocData({
        elements: doc.elements.map(el =>
          el.id === id
            ? {
                ...el,
                position: { x: snap(elRef.current.x()), y: snap(elRef.current.y()) },
                update: true,
              }
            : el,
        ),
        changed: true,
      }),
    )
  }

  // TODO - добавить изменение размеров и угла поворота - установить флаг update
  const handleTransformEnd = ({ target }) => {
    const el = target
    console.log(el.rotation())
  }

  const commonProps = {
    ref: elRef,
    x: x,
    y: y,
    width: width,
    height: height,
    draggable: doc.editable,
    onDragStart: handleElDragStart,
    onDragEnd: handleElDragEnd,
    onClick: doc.editable && onSelect,
    onTap: doc.editable && onSelect,
  }

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([elRef.current])
    }
  }, [isSelected])

  if (!width && !height) return

  return (
    <>
      {img || reservImg ? (
        <Image
          {...commonProps}
          image={img || reservImg}
          onTransformEnd={handleTransformEnd}
        />
      ) : (
        <Rect {...commonProps} stroke='white' onTransformEnd={handleTransformEnd} />
      )}
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            return Math.abs(newBox.width) < 20 || Math.abs(newBox.height) < 20
              ? oldBox
              : newBox
          }}
        />
      )}
    </>
  )
}
