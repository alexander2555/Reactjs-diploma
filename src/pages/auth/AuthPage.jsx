import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { proxy } from '../../proxy'
import { Button, Form, Input } from '../../components'
import { setSession } from '../../actions'
import { selectUserRole } from '../../selectors'
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
  const dispatch = useDispatch()
  const nav = useNavigate()

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

  const [error, setError] = useState(null)

  const roleId = useSelector(selectUserRole)

  if (roleId !== ROLE.GUEST) {
    return <Navigate to={'/'} />
  }

  const onSubmit = ({ login, password }) => {
    proxy.login(login, password).then(({ error, res }) => {
      if (error) {
        setError(`Ошибка входа: ${error}`)
        return
      }
      setError(null)
      reset()
      dispatch(setSession(res))

      nav('/')
    })
  }

  const formError = errors?.login || errors?.password || errors?.passCheck
  const errMessage = error || formError?.message

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['form-center']}
    >
      <Input
        type='text'
        placeholder='Имя пользователя'
        {...register('login', { onChange: () => setError(null) })}
      />
      <Input
        type='password'
        placeholder='Пароль'
        {...register('password', { onChange: () => setError(null) })}
      />

      <Button
        type='submit'
        disabled={!!formError}
      >
        Войти
      </Button>

      {!!errMessage && <p style={{ color: 'red' }}>{errMessage}</p>}

      <Link to={'/register'}>Регистрация</Link>
    </Form>
  )
}
