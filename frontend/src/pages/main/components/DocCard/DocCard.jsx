import cn from 'classnames'

import { Icon } from '../../../../components'

export const DocCard = ({
  docData: { title, description, preview },
  onCardClick,
  styles,
  selected,
}) => {
  return (
    <li
      className={cn(styles['documents-item'], selected && styles.selected)}
      onClick={onCardClick}
    >
      <div className={styles['documents-item__sheet']}>
        {preview ? (
          <img
            src={preview}
            width={320}
            height={320}
            alt={title}
            className={styles['documents-item__preview']}
          />
        ) : (
          <Icon
            className={styles['documents-item__icon']}
            iconType='regular'
            iconName='image'
          />
        )}
        <h4 className={styles['documents-item__title']}>{title}</h4>
        <p className={styles['documents-item__description']}>{description}</p>
      </div>
    </li>
  )
}
