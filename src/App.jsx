import { Route, Routes } from 'react-router-dom'

export const App = () => {
  return (
    <>
      <h1>App</h1>
      <Routes>
        <Route path='/' element={<div>Home</div>} />
      </Routes>
    </>
  )
}
