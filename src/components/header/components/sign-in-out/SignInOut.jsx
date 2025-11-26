import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Icon, Button } from '../../../../components'
import {
  selectUserLogin,
  selectUserRole,
  selectUserSession,
} from '../../../../selectors'
import { closeSession } from '../../../../actions'
import { ROLE } from '../../../../constants'
import styles from './sign-in-out.module.sass'

export const SignInOut = ({ className }) => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const session = useSelector(selectUserSession)
  const roleId = useSelector(selectUserRole)
  const login = useSelector(selectUserLogin)

  const onSignOut = () => {
    dispatch(closeSession(session))
    nav('/')
  }

  return (
    <div className={className}>
      {roleId === ROLE.GUEST ? (
        <Button
          className={styles['btn-sign-in-out']}
          title='Sign In'
          to='/login'
        >
          <Icon
            iconType='solid'
            iconName='user'
          />
          &nbsp;Sign In
        </Button>
      ) : (
        <div>
          <strong>{login}</strong>&nbsp;
          <Button
            className={styles['btn-sign-in-out']}
            title='Sign Out'
            onClick={onSignOut}
          >
            <Icon
              iconType='solid'
              iconName='right-from-bracket'
            />
          </Button>
        </div>
      )}
    </div>
  )
}
