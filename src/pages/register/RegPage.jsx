import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Form } from '../../components'
import { setSession } from '../../actions'
import { selectUserRole } from '../../selectors'
import { ROLE } from '../../constants'
import { proxy } from '../../proxy'

import styles from './RegPage.module.sass'

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
  const nav = useNavigate()

  const [error, setError] = useState(null)

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

  const roleId = useSelector(selectUserRole)

  const onSubmit = ({ login, password }) => {
    proxy.register(login, password).then(({ error, res }) => {
      if (error) {
        setError(error)
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

  if (roleId !== ROLE.GUEST) {
    return <Navigate to='/' />
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['form-center']}
    >
      <Input
        type='text'
        placeholder='логин'
        {...register('login', { onChange: () => setError(null) })}
      />
      <Input
        type='password'
        placeholder='пароль'
        {...register('password', { onChange: () => setError(null) })}
      />
      <Input
        type='password'
        placeholder='повтор пароля'
        {...register('passCheck', { onChange: () => setError(null) })}
      />

      <Button
        type='submit'
        disabled={!!formError}
      >
        Зарегистрировать
      </Button>

      {!!errMessage && <p style={{ color: 'red' }}>{errMessage}</p>}
    </Form>
  )
}
