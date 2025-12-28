import { getHash } from '../../utils'

import cn from 'classnames'
import styles from './Select.module.sass'

export const Select = ({ className, id, label, ref, options, ...props }) => {
  const htmlId = id ? id : label ? `${'select'}-${getHash(8)}` : null

  return (
    options &&
    !!options.length && (
      <div className={cn([styles['select-container'], className])}>
        {label && (
          <label className={styles['select-label']} htmlFor={htmlId}>
            {label}
          </label>
        )}
        &nbsp;
        <select id={htmlId} {...props} ref={ref}>
          {options.map(([val, lbl], i) => (
            <option key={i} value={val}>
              {lbl}
            </option>
          ))}
        </select>
      </div>
    )
  )
}
