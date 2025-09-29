export const collages = [
  {
    _id: '001',
    title: 'Collage 1',
    description: 'This is the first collage.',
  },
  {
    _id: '002',
    title: 'Collage 2',
    description: 'This is the second collage.',
  },
]

export const graphics = [
  {
    _id: '001',
    title: 'Picture 1',
    description: 'This is the first picture.',
    image: 'https://picsum.photos/id/1015/400/300',
  },
  {
    _id: '002',
    title: 'Picture 2',
    description: 'This is the second picture.',
    image: 'https://picsum.photos/id/1016/400/300',
  },
]

export const coll_graph = [
  {
    _id: '001',
    coll_id: '001',
    graph_id: '001',
    position: { x: 100, y: 100 },
    size: { width: 200, height: 150 },
  },
  {
    _id: '002',
    coll_id: '001',
    graph_id: '002',
    position: { x: 350, y: 100 },
    size: { width: 200, height: 150 },
  },
  {
    _id: '003',
    coll_id: '002',
    graph_id: '001',
    position: { x: 100, y: 100 },
    size: { width: 200, height: 150 },
  },
]

export const users = [
  {
    _id: '001',
    username: 'user1',
    password: 'pass001',
  },
  {
    _id: '002',
    username: 'user2',
    password: 'pass002',
  },
]
