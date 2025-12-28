import { getHash } from '../../utils'

import cn from 'classnames'
import styles from './Input.module.sass'

const InputEl = ({ onFinishInput, ref, ...props }) => (
  <input
    ref={ref}
    onKeyDown={({ key }) => {
      if (key === 'Enter' && typeof onFinishInput === 'function') onFinishInput()
    }}
    onBlur={onFinishInput}
    {...props}
  />
)

export const Input = ({ className, id, label, type, ...props }) => {
  const htmlId = id ? id : label ? `${'input'}-${getHash(8)}` : null
  const isTypeFile = type === 'file'

  return label ? (
    <>
      <label htmlFor={htmlId} className={cn(className, styles['input_labeled'])}>
        {label}
        {!isTypeFile && <InputEl id={htmlId} type={type} {...props} />}
      </label>
      {isTypeFile && <InputEl id={htmlId} type={type} {...props} />}
    </>
  ) : (
    <InputEl className={className} id={htmlId} type={type} {...props} />
  )
}
