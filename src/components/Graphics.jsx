import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDocument } from '../selectors'

import { Image, Rect, Transformer } from 'react-konva'
import { setDocData } from '../actions'
import { snap } from '../utils'

export const Graphics = ({ element, libRef, isSelected, onSelect }) => {
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

  const commonProps = {
    ref: elRef,
    x: x,
    y: y,
    width: width,
    height: height,
    draggable: true,
    onDragStart: handleElDragStart,
    onDragEnd: handleElDragEnd,
    onClick: onSelect,
    onTap: onSelect,
  }

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([elRef.current])
    }
  }, [isSelected])

  return (
    <>
      {img ? (
        <Image {...commonProps} image={img} />
      ) : (
        <Rect {...commonProps} stroke='white' />
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
