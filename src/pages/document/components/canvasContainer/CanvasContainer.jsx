import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectDocument } from '../../../../selectors'

import { Stage, Layer, Rect } from 'react-konva'

import { useDocEnvironment, useScale, useSelectEl } from '../../../../providers'

import { Graphics, Loader } from '../../../../components'
import { setDocData } from '../../../../actions'
import { useResizeObserver } from '../../../../hooks/useResizeObserver'
import { getHash } from '../../../../utils'

const dpr = window.devicePixelRatio || 1

export const CanvasContainer = ({ className }) => {
  const dispatch = useDispatch()
  const doc = useSelector(selectDocument)

  const { libRef, stageRef, draggingImgRef, isLoading } = useDocEnvironment()

  const canvasRef = useRef(null)

  /**
   * Перемещение холста
   */
  const [stagePos, setStagePosition] = useState({ x: 0, y: 0 })

  const handleDragStart = ({ target }) => {
    if (target !== stageRef.current) return
  }
  const handleDragEnd = ({ target }) => {
    setStagePosition(target.getStage().position())
  }

  /**
   * Масштаб
   */
  const { scale, setScale } = useScale()

  const handleWheel = ({ evt }) => {
    evt.preventDefault()
    const stage = stageRef.current
    if (!stage) return
    const oldScale = scale
    const scaleBy = 1.1
    const pointer = stage.getPointerPosition()
    const currPointerPosition = {
      x: (pointer.x - stagePos.x) / oldScale,
      y: (pointer.y - stagePos.y) / oldScale,
    }
    const newScale = (evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy).toFixed(1)
    setScale(Number(newScale))
    setStagePosition({
      x: pointer.x - currPointerPosition.x * newScale,
      y: pointer.y - currPointerPosition.y * newScale,
    })
  }

  /**
   * Добавление элемента на холст
   */
  const handleDrop = e => {
    if (!doc.editable) return

    e.preventDefault()
    stageRef.current.setPointersPositions(e)
    const elId = draggingImgRef?.current
    dispatch(
      setDocData({
        elements: [
          ...doc.elements,
          {
            id: getHash(4), // временный id
            el_id: elId,
            position: { ...stageRef.current.getPointerPosition() },
            size: {
              width: libRef.current[elId]?.width || 100,
              height: libRef.current[elId]?.height || 100,
            },
            new: true,
          },
        ],
        changed: true,
      }),
    )
  }

  /**
   * Выделение элементов
   */
  const { selectedEl, setSelectedEl } = useSelectEl() || {}
  // Снять выделение при клике на холст
  const checkUnselect = ({ target }) => {
    if (target === target.getStage()) {
      setSelectedEl(null)
    }
  }

  /**
   * Размер холста
   */
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 })
  // Отслеживание изменения размеров окна
  useResizeObserver(
    canvasRef,
    isLoading,
    setStageSize,
    setStagePosition,
    setScale,
    doc.size,
  )

  return isLoading ? (
    <Loader local={true} message={'Загрузка'} />
  ) : (
    <div
      className={className}
      ref={canvasRef}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
    >
      <Stage
        className='stage'
        ref={stageRef}
        x={stagePos.x}
        y={stagePos.y}
        width={stageSize.width * dpr}
        height={stageSize.height * dpr}
        scaleX={scale * dpr}
        scaleY={scale * dpr}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onWheel={handleWheel}
        onMouseDown={checkUnselect}
        onTouchStart={checkUnselect}
      >
        {!!(stageSize.width * stageSize.height) && (
          <Layer>
            {/** Визуализация холста */}
            <Rect
              width={doc.size.width}
              height={doc.size.height}
              stroke='white'
              strokeWidth={1}
              shadowBlur={25}
              shadowColor={doc.bg_color}
              fill={doc.bg_color}
              cornerRadius={10}
              onMouseDown={() => setSelectedEl(null)}
              onTouchStart={() => setSelectedEl(null)}
            />
            {/***/}
            {doc.elements.map(el => (
              <Graphics
                key={el.id}
                element={el}
                libRef={libRef}
                isSelected={selectedEl === el.id}
                onSelect={() => setSelectedEl(el.id)}
              />
            ))}
          </Layer>
        )}
      </Stage>
    </div>
  )
}
