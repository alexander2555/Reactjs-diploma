import styles from './form.module.sass'

export const Form = ({ className, children, ...props }) => {
  return (
    <form
      className={styles.form + (className ? ` ${className}` : '')}
      method='post'
      {...props}
    >
      {children}
    </form>
  )
}
