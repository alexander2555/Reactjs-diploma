import styles from './Loader.module.sass'

export const Loader = ({ children, message, local }) => {
  const classes = styles.loader + (local ? ` ${styles['loader_local']}` : '')

  return (
    <div className={classes}>
      {children}
      <span className={styles['loader-message']}>{message}...</span>
    </div>
  )
}
