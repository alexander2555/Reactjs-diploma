import { useDispatch, useSelector } from 'react-redux'
import { useMatches, useNavigate } from 'react-router-dom'

import { Icon, Button } from '../../../../../../components'
import {
  selectDocument,
  selectUserLogin,
  selectUserRole,
  selectUserSession,
} from '../../../../../../selectors'
import { closeSession, saveDocAsync } from '../../../../../../actions'

import { ROLE } from '../../../../../../constants'

import { IDocument } from '../../../../../../types'

import styles from './Controls.module.sass'

export const Controls = ({ className, isDocPage }) => {
  const isLoginPage = useMatches().at(-1).pathname.includes('login')

  const nav = useNavigate()
  const dispatch = useDispatch()
  const session = useSelector(selectUserSession)
  const roleId = useSelector(selectUserRole)
  const login = useSelector(selectUserLogin)

  const docData = useSelector(selectDocument)

  const onSave = () => {
    // nav - для навигации на новый документ
    const dataForUpdate = Object.fromEntries(
      Object.keys(IDocument).map(key => [key, docData[key]]),
    )
    dispatch(saveDocAsync(dataForUpdate, nav))
  }

  const onSignOut = () => {
    dispatch(closeSession(session))

    nav('/')
  }

  return (
    <div className={className}>
      {isDocPage && docData.changed && (
        <Button
          className={styles['btn-save']}
          title='Save changes'
          onClick={() => onSave()}
        >
          Сохранить
        </Button>
      )}
      {!isLoginPage &&
        (roleId === ROLE.GUEST ? (
          <Button className={styles['btn-login']} title='Войти' to='/login'>
            <Icon iconType='solid' iconName='user' />
            &nbsp;Вход
          </Button>
        ) : (
          <div>
            <strong>{login}</strong>&nbsp;
            <Button
              className={styles['btn-sign-in-out']}
              title='Выйти'
              onClick={onSignOut}
            >
              <Icon iconType='solid' iconName='right-from-bracket' />
            </Button>
          </div>
        ))}
    </div>
  )
}
