import styles from './Footer.module.sass'

export const Footer = () => (
  <>
    <span className={styles.copyrights}>
      &copy; 2025-{new Date().getFullYear()}&nbsp;Alexander Mamontov
    </span>
  </>
)
