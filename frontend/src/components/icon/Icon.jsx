import styles from './icon.module.sass'

export const Icon = ({ className, iconType = 'solid', iconName }) => (
  <div className={styles.icon + (className ? ` ${className}` : '')}>
    <i className={`fa-${iconType} fa-${iconName}`} aria-hidden='true'></i>
  </div>
)
