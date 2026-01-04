import { useSelector } from 'react-redux'

import { selectGraphicsLib, selectUserId } from '../../../../selectors'

import { Loader } from '../../../../components'
import { GraphicsItem } from './components'

import { useLibrary, useSelectEl } from '../../../../providers'

import { apiRequest } from '../../../../utils/api-request'

import styles from '../../LibPage.module.sass'

export const GraphicsContainer = () => {
  const userId = useSelector(selectUserId)
  const graphicsLib = useSelector(selectGraphicsLib)

  const { libLoading, setRemovable, libError, filteredLib } = useLibrary()
  const { selectedEl, setSelectedEl } = useSelectEl()

  const handleSelect = async id => {
    setSelectedEl(id)
    setRemovable(false)

    const selectedEl = graphicsLib.find(el => el.id === id)
    // Проверка - задействован ли выделенный элемент в каких-то документах
    const docElements = await apiRequest(`doc_el?el_id=${id}`)
    const isUsed = docElements?.length
    const canRemove = userId === selectedEl.owner_id || selectedEl.public

    setRemovable(!isUsed && canRemove)
  }

  return libLoading ? (
    <Loader message={libLoading} />
  ) : (
    <div className={styles['graphics-list']}>
      {filteredLib.length ? (
        filteredLib.map(({ id, image_url, description }) => (
          <GraphicsItem
            key={id}
            imgSrc={image_url}
            descr={description}
            onSelect={() => handleSelect(id)}
            selected={selectedEl === id}
          />
        ))
      ) : (
        <p>Библиотека пуста{libError && ` (Ошибка: ${libError})`}</p>
      )}
    </div>
  )
}
