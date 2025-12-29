import cn from 'classnames'
import styles from '../../../../LibPage.module.sass'

export const GraphicsItem = ({ className, imgSrc, descr, onSelect, selected }) => (
  <div
    className={cn([className, styles['graphics-item'], selected && styles.selected])}
    onClick={onSelect}
  >
    <img src={imgSrc} alt={descr} className={styles['graphics-item__image']} />
  </div>
)
