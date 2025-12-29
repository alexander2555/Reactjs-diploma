import styles from './MainLayout.module.sass'

export const MainLayout = ({ leftPanel, mainContent, rightPanel }) => {
  return (
    <>
      {leftPanel && <div className={styles.panel}>{leftPanel}</div>}
      <div className={styles.content}>{mainContent}</div>
      {rightPanel && <div className={styles.panel}>{rightPanel}</div>}
    </>
  )
}
