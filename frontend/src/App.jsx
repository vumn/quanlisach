import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreatePage from './pages/CreatePage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/create' element={<CreatePage />} />
      </Routes>
    </div>
  )
}

export default App
