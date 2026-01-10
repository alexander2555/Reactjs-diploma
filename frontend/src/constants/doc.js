import { color } from '.'

export const DEFAULT_DOC = {
  id: null,
  title: '',
  description: '',
  owner_id: null,
  editor_id: null,
  public: false,
  elements: [],
  changed: false,
  size: { width: 800, height: 1000 },
  bg_color: Object.keys(color)[0],
  preview: null,
}

export const DEFAULT_DOC_ELEMENT = {
  id: null,
  el_id: null,
  position: { x: 0, y: 0 },
  size: { width: 100, height: 100 },
  rotation: 0,
  create: false,
  update: false,
  delete: false,
}

export const createDefaultDocState = () => ({
  ...DEFAULT_DOC,
  size: { ...DEFAULT_DOC.size },
  elements: [],
})
