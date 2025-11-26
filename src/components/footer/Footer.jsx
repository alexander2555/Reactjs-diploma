import styles from './footer.module.sass'

export const Footer = () => (
  <>
    <span className={styles.copyrights}>
      &copy; {new Date().getFullYear()}&nbsp;Footer text
    </span>
  </>
)
