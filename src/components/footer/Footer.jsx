import styles from './footer.module.sass'

export const Footer = ({ className }) => (
  <footer className={className}>
    <span className={styles.copyrights}>
      &copy; {new Date().getFullYear()}&nbsp;Footer text
    </span>
  </footer>
)
