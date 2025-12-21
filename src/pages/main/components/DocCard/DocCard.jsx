import cn from 'classnames'

export const DocCard = ({
  docData: { title, description },
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
        <h4 className={styles['documents-item__title']}>{title}</h4>
        <p className={styles['documents-item__description']}>{description}</p>
      </div>
    </li>
  )
}
