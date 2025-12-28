import { useEffect } from 'react'

export const useResizeObserver = (
  canvasRef,
  isLoading,
  setStageSize,
  currPointerPosition,
  setScale,
  docSize,
) => {
  useEffect(() => {
    if (!canvasRef.current && isLoading) {
      console.warn('Canvas not found in DOM!')
      return
    }

    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect

      setStageSize({ width, height })

      const dWidth = width - docSize.width - 50
      const dHeight = height - docSize.height - 50
      const initScale =
        Math.round(
          (1 + (dWidth > dHeight ? dHeight / docSize.height : dWidth / docSize.width)) *
            10,
        ) / 10

      setScale(initScale)

      const offset = {
        x: dWidth > dHeight ? (width - docSize.width * initScale - 50) / 2 + 25 : 25,
        y: dWidth <= dHeight ? (height - docSize.height * initScale - 50) / 2 + 25 : 25,
      }

      currPointerPosition({ x: offset.x, y: offset.y })
    })

    resizeObserver.observe(canvasRef.current)

    return () => resizeObserver?.disconnect()
  }, [isLoading])
}
