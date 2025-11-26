const initialDocsState = [
  {
    id: '001',
    title: 'Collage 1',
    description: 'This is the first collage.',
    created_at: '2023-10-01T10:00:00Z',
    owner_id: '001',
    editor_id: '002',
    published: true,
  },
]

export const docsReducer = (state = initialDocsState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
