import { Logo, SignInOut } from './components'
import styles from './header.module.sass'

export const Header = ({ pageTitle }) => (
  <>
    <Logo className={styles.logo} />
    <h1 className={styles.h1}>{pageTitle}</h1>
    <SignInOut />
  </>
)
