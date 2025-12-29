import { MainLayout } from '../../layouts'
import { GraphicsContainer, LeftPanel } from './components'

import { LibProvider, SelectProvider } from '../../providers'

export const LibPage = () => {
  return (
    <LibProvider>
      <SelectProvider>
        <MainLayout leftPanel={<LeftPanel />} mainContent={<GraphicsContainer />} />
      </SelectProvider>
    </LibProvider>
  )
}
