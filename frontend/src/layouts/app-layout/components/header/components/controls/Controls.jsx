import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'

import { Icon, Button } from '../../../../../../components'
import {
  selectDocument,
  selectUserLogin,
  selectUserRole,
} from '../../../../../../selectors'
import { closeSession, saveDocAsync, setPending } from '../../../../../../actions'

import { apiRequest } from '../../../../../../utils'

import { ROLE } from '../../../../../../constants'

import styles from './Controls.module.sass'

export const Controls = ({ className, isDocPage }) => {
  const isLoginPage = useMatches().at(-1).pathname.includes('login')

  const nav = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const roleId = useSelector(selectUserRole)
  const login = useSelector(selectUserLogin)

  const docData = useSelector(selectDocument)

  const userNameRef = useRef(null)

  useEffect(() => {
    apiRequest('users/roles')
      .then(roles => {
        const roleName = roles?.find(r => r.id === roleId)?.name
        if (roleName) {
          userNameRef.current?.setAttribute('data-role', roleName)
        }
      })
      .catch(console.warn)
  }, [roleId])

  const onSave = () => {
    // nav - для навигации на новый документ
    dispatch(saveDocAsync(docData, nav))
  }

  const onSignOut = () => {
    dispatch(closeSession())
    dispatch(setPending(false))
    nav('/', { replace: true })
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
          <Button
            className={styles['btn-login']}
            title='Войти'
            to='/login'
            state={{ from: location.pathname }}
          >
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
