import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Form, Select } from '../../components'
import { setAuthError } from '../../actions'
import { selectAuthData } from '../../selectors'
import { ROLE } from '../../constants'

import styles from './RegPage.module.sass'
import { registerAsync } from '../../actions/auth/register-async'

const regFromSchema = yup.object().shape({
  login: yup
    .string()
    .required('Логин обязателен')
    .matches(/^\w+$/, 'Логин должен состоять из букв и цифр')
    .min(3, 'Логин должен быть не менее 3 символов')
    .max(20, 'Логин должен быть не более 20 символов'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .matches(/^[\w$#%]+$/, 'Пароль должен состоять из букв и цифр, #, %')
    .min(6, 'Пароль должен быть не менее 6 символов')
    .max(20, 'Пароль должен быть не более 20 символов'),
  passCheck: yup
    .string()
    .required('Пароль 2 обязателен')
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
})

export const RegPage = () => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
      passCheck: '',
    },
    resolver: yupResolver(regFromSchema),
  })

  const { error, roleId, isPending } = useSelector(selectAuthData)

  if (roleId !== ROLE.GUEST) {
    return <Navigate to='/' />
  }

  const onSubmit = regData => {
    console.log(regData)
    dispatch(registerAsync(regData))
    reset()
  }

  const handleInputChange = () => {
    if (error) () => dispatch(setAuthError(null))
  }

  const formError = errors?.login || errors?.password || errors?.passCheck
  const errMessage = error || formError?.message

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles['form-center']}>
      <Input
        type='text'
        placeholder='логин'
        {...register('login', { onChange: handleInputChange })}
        disabled={isPending}
      />
      <Input
        type='password'
        placeholder='пароль'
        {...register('password', { onChange: handleInputChange })}
        disabled={isPending}
      />
      <Input
        type='password'
        placeholder='повтор пароля'
        {...register('passCheck', { onChange: handleInputChange })}
        disabled={isPending}
      />
      <Select
        label='Роль'
        options={[
          [1, 'Мастер'],
          [2, 'Пользователь'],
        ]}
        {...register('role')}
        disabled={isPending}
      />

      <Button type='submit' disabled={!!formError && isPending}>
        {isPending ? 'Проверка ...' : 'Зарегистрировать'}
      </Button>

      {!!errMessage && <p style={{ color: 'red' }}>{errMessage}</p>}
    </Form>
  )
}
