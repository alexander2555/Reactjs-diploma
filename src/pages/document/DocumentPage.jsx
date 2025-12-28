import { useSelector } from 'react-redux'
import { selectDocument } from '../../selectors'

import { DocEnvProvider, ScaleProvider } from '../../providers'

import { MainLayout } from '../../layouts'
import { CanvasContainer, LeftPanel, RightPanel } from './components'

import styles from './DocumentPage.module.sass'

export const DocumentPage = () => {
  const doc = useSelector(selectDocument)

  return (
    <DocEnvProvider>
      <ScaleProvider>
        <MainLayout
          leftPanel={doc.editable && <LeftPanel />}
          mainContent={<CanvasContainer className={styles['canvas-container']} />}
          rightPanel={doc.editable && <RightPanel />}
        />
      </ScaleProvider>
    </DocEnvProvider>
  )
}
