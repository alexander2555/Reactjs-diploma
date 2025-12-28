import { useDispatch, useSelector } from 'react-redux'
import { useMatches, useNavigate } from 'react-router-dom'

import { Icon, Button } from '../../../../../../components'
import {
  selectDocument,
  selectUserLogin,
  selectUserRole,
  selectUserSession,
} from '../../../../../../selectors'
import { closeSession, saveDocAsync, setPending } from '../../../../../../actions'

import { ROLE } from '../../../../../../constants'

import { IDocument } from '../../../../../../types'

import styles from './Controls.module.sass'
import { useEffect, useRef } from 'react'
import { fetchRoles } from '../../../../../../proxy/operations'

export const Controls = ({ className, isDocPage }) => {
  const isLoginPage = useMatches().at(-1).pathname.includes('login')

  const nav = useNavigate()
  const dispatch = useDispatch()
  const session = useSelector(selectUserSession)
  const roleId = useSelector(selectUserRole)
  const login = useSelector(selectUserLogin)

  const docData = useSelector(selectDocument)

  const userNameRef = useRef(null)

  useEffect(() => {
    fetchRoles(roleId)
      .then(({ res, err }) => {
        if (err) throw new Error(err)

        userNameRef.current?.setAttribute('data-role', res?.name)
      })
      .catch(console.warn)
  }, [roleId])

  const onSave = () => {
    // nav - для навигации на новый документ
    const dataForUpdate = Object.fromEntries(
      Object.keys(IDocument).map(key => [key, docData[key]]),
    )
    dispatch(saveDocAsync(dataForUpdate, nav))
  }

  const onSignOut = () => {
    dispatch(closeSession(session))
    dispatch(setPending(false))
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
            <div className={styles['user-name']} ref={userNameRef}>
              {login}
            </div>
            &nbsp;
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
