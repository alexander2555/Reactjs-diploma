import { Link, Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Form, Input } from '../../components'

import { loginAsync, setAuthError } from '../../actions'
import { selectAuthData } from '../../selectors'

import { ROLE } from '../../constants'

import styles from './AuthPage.module.sass'

const schema = yup.object().shape({
  login: yup
    .string()
    .required('Введите логин')
    .matches(/^\w+$/, 'Для имени пользоателя допустимы латинские буквы, цифры и _')
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
  const location = useLocation()

  const { roleId, isPending, error } = useSelector(selectAuthData)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      loginVal: '',
      passwordVal: '',
    },
    resolver: yupResolver(schema),
  })

  if (roleId !== ROLE.GUEST) {
    return <Navigate to={location.state?.from || '/'} replace={true} />
  }

  const onSubmit = loginCredentials => {
    dispatch(loginAsync(loginCredentials, reset))
  }

  const handleInputChange = () => {
    if (error) dispatch(setAuthError(null))
  }

  const formError = errors?.login || errors?.password || errors?.passCheck
  const errMessage = error || formError?.message

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles['form-center']}>
      <Input
        type='text'
        placeholder='Имя пользователя'
        {...register('login', { onChange: handleInputChange })}
        disabled={isPending}
      />
      <Input
        type='password'
        placeholder='Пароль'
        {...register('password', { onChange: handleInputChange })}
        disabled={isPending}
      />

      <Button type='submit' disabled={!!formError && isPending}>
        {isPending ? 'Проверка ...' : 'Войти'}
      </Button>

      {!!errMessage && <p style={{ color: 'red' }}>{errMessage}</p>}

      <Link to={'/register'}>Регистрация</Link>
    </Form>
  )
}
