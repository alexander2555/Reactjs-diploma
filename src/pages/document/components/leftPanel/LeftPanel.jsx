import { useSelector } from 'react-redux'

import { selectDocument } from '../../../../selectors'

import { Button, Loader } from '../../../../components'
import { LibItem } from './components'

import { useDocEnvironment, useLibrary } from '../../../../providers'

import { stagePDFExport } from '../../../../utils'

import styles from '../../DocumentPage.module.sass'

export const LeftPanel = () => {
  const doc = useSelector(selectDocument)

  const { stageRef, draggingImgRef, isLoading } = useDocEnvironment()
  const { libLoading, libRef, filteredLib } = useLibrary()

  const handleExport = () => {
    const stage = stageRef.current

    stagePDFExport(stage, doc.title, doc.size)
  }

  return (
    <>
      <Button to={'/library'}>Библиотека</Button>
      {!libLoading && filteredLib?.length ? (
        <ul className={styles['elements-list']}>
          {filteredLib.map(({ id, ...elData }) => (
            <LibItem
              key={id}
              className={styles['elements-item']}
              el={elData}
              ref={image => {
                libRef.current[id] = image
              }}
              onDragStart={() => (draggingImgRef.current = id)}
            />
          ))}
        </ul>
      ) : libLoading ? (
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
