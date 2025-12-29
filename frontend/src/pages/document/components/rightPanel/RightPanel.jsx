import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setDocChanged, setDocData, setDocPublicStatus } from '../../../../actions'

import { Button, Icon, Input, Select } from '../../../../components'
import { selectDocument, selectUserId, selectUserRole } from '../../../../selectors'
import { useScale, useSelectEl } from '../../../../providers'

import { checkAccess } from '../../../../utils'
import { ROLE, color } from '../../../../constants'

import styles from '../../DocumentPage.module.sass'
import cn from 'classnames'
import { fetchUsers } from '../../../../proxy/operations'

export const RightPanel = () => {
  const dispatch = useDispatch()

  const doc = useSelector(selectDocument)
  const roleId = useSelector(selectUserRole)
  const userId = useSelector(selectUserId)

  // Список потенциальных редакторов
  const [editors, setEdotors] = useState([])

  // Уровень доступа пользователя сессии
  const ownerRole = checkAccess([ROLE.MASTER], roleId) && userId === doc.owner_id
  const accessAdminRole = checkAccess([ROLE.ADMIN], roleId) || ownerRole

  const { scale, setScale } = useScale()
  const onScaleChange = ({ target }) => {
    setScale(target.value)
  }

  const { selectedEl, setSelectedEl } = useSelectEl() || {}
  const onElRemove = () => {
    dispatch(
      setDocData({
        elements: [...doc.elements.filter(el => el.id !== selectedEl)],
        changed: true,
      }),
    )
    setSelectedEl(null)
  }

  const onDocClear = () => {
    dispatch(setDocData({ elements: [], changed: true }))
    setSelectedEl(null)
  }

  const onDocBgColorChange = ({ target }) => {
    dispatch(setDocData({ bg_color: target.value, changed: true }))
  }

  const onDocEditorChange = ({ target }) => {
    dispatch(setDocData({ editor_id: target.value, changed: true }))
  }

  useEffect(() => {
    fetchUsers().then(({ res, err }) => {
      if (err) {
        console.warn(err)
        return
      }

      setEdotors(res.filter(r => checkAccess([ROLE.USER], r.role_id)))
    })
  }, [])

  return (
    <>
      <Input
        className={styles['input-scale']}
        type='number'
        min='0.1'
        max='5'
        label={<Icon iconName='maximize' />}
        value={scale}
        onChange={onScaleChange}
      />
      {doc.editable && (
        <>
          <Select
            type='select'
            className={cn(styles.select, styles['select-background'])}
            label='Цвет фона'
            value={doc.bg_color}
            options={Object.entries(color)}
            onChange={onDocBgColorChange}
          />
          {!!doc.elements.length && (
            <>
              <Button className={styles['btn-clear']} onClick={onDocClear}>
                Очистить холст
              </Button>
              {selectedEl && (
                <Button className={styles['btn-del']} onClick={onElRemove}>
                  Удалить
                </Button>
              )}
            </>
          )}
        </>
      )}
      <div className={styles['input-group-bottom']}>
        {ownerRole && (
          <Input
            type='checkbox'
            label='публичный'
            title='Сделать публичным'
            checked={doc.public}
            className={styles['input-public']}
            onChange={() => {
              dispatch(setDocPublicStatus(!doc.public))
              if (!doc.changed) dispatch(setDocChanged())
            }}
          />
        )}
        {accessAdminRole && (
          <Select
            type='select'
            className={cn(styles.select, styles['select-editor'])}
            label='Редактор'
            title='Назначить редактора'
            value={doc.editor_id || ''}
            options={[['', 'Нет'], ...editors.map(u => [u.id, u.login])]}
            onChange={onDocEditorChange}
          />
        )}
      </div>
    </>
  )
}
