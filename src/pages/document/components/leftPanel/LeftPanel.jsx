import { Button, Loader } from '../../../../components'
import { LibItem } from './components/libItem/LibItem'

import { useSelector } from 'react-redux'
import { selectDocument } from '../../../../selectors'

import { useDocEnvironment } from '../../../../providers'

import styles from '../../DocumentPage.module.sass'
import { stagePDFExport } from '../../../../utils'

export const LeftPanel = () => {
  const doc = useSelector(selectDocument)

  const { lib, stageRef, libRef, draggingImgRef, isLoading } = useDocEnvironment()

  const handleExport = () => {
    const stage = stageRef.current

    stagePDFExport(stage, doc.title, doc.size)
  }

  return (
    <>
      <Button to={'/library'}>Библиотека</Button>
      {!isLoading && lib && lib.length ? (
        <ul className={styles['elements-list']}>
          {lib.map(({ id, ...elData }) => (
            <LibItem
              key={id}
              className={styles['elements-item']}
              el={elData}
              ref={image => {
                libRef.current[id] = image
              }}
              libRef={libRef}
              onDragStart={() => (draggingImgRef.current = id)}
            />
          ))}
        </ul>
      ) : isLoading ? (
        <Loader content='Загрузка' />
      ) : (
        <div>Нет элементов</div>
      )}
      {!isLoading && !!doc?.elements.length && (
        <Button onClick={handleExport} className={styles['btn-export']}>
          Экспорт в PDF
        </Button>
      )}
    </>
  )
}
