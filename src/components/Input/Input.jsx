import { forwardRef } from 'react'

import { getHash } from '../../utils'

import cn from 'classnames'
import styles from './Input.module.sass'

const InputEl = forwardRef(({ onFinishInput, ...props }, ref) => (
  <input
    ref={ref}
    onKeyDown={({ key }) => {
      if (key === 'Enter' && typeof onFinishInput === 'function') onFinishInput()
    }}
    onBlur={onFinishInput}
    {...props}
  />
))

export const Input = ({ className, id, label, ...props }) => {
  const htmlId = id ? id : label ? `${'input'}-${getHash(8)}` : null

  return label ? (
    <label htmlFor={htmlId} className={cn(className, styles['input_labeled'])}>
      {label}
      <InputEl id={htmlId} {...props} />
    </label>
  ) : (
    <InputEl className={className} id={htmlId} {...props} />
  )
}
