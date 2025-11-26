import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { server } from '../../proxy'
import { Button, Form } from '../../components'
import { setSession } from '../../actions'
import { selectUserRole, selectUserLogin } from '../../selectors'
import { ROLE } from '../../constants'

import styles from './AuthPage.module.sass'

const schema = yup.object().shape({
  login: yup
    .string()
    .required('Введите логин')
    .matches(
      /^\w+$/,
      'Для имени пользоателя допустимы латинские буквы, цифры и _',
    )
    .min(3, 'Минимум 3 символа')
    .max(12, 'Максимум 12 символов'),
  password: yup
    .string()
    .required('Введите пароль')
    .matches(
      /^[\w#&%]+$/,
      'Для пароля допустимы латинские буквы, цифры и символы _ # % &',
    )
    .min(6, 'Минимум 6 символов'),
})

export const AuthPage = () => {
  // const store = useStore()
  const dispatch = useDispatch()
  const nav = useNavigate()
  const roleId = useSelector(selectUserRole)
  const login = useSelector(selectUserLogin)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const [serverError, setServerError] = useState(null)

  const onSubmit = ({ login, password }) => {
    server.authorize(login, password).then(({ error, res }) => {
      if (error) {
        setServerError(`Ошибка сервера: ${error}`)
        return
      }
      setServerError(null)
      dispatch(setSession(res))
      reset()
      nav('/')
    })
  }

  const errMessage =
    errors?.login?.message || errors?.password?.message || serverError

  if (roleId !== ROLE.GUEST)
    return (
      <div>
        <p>
          Вход выполнен.
          <br />
          Имя пользователя: <b>{login}</b>
        </p>
      </div>
    )

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['form-center']}
    >
      <input
        type='text'
        placeholder='Имя пользователя'
        {...register('login')}
      />
      <input
        type='password'
        placeholder='Пароль'
        {...register('password')}
      />

      <Button type='submit'>Войти</Button>

      {!!errMessage && <p style={{ color: 'red' }}>{errMessage}</p>}
    </Form>
  )
}
