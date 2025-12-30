import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddUpdate from './components/AddUpdate'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/update/:id' element={<AddUpdate />} />
      </Routes>
    </div>
  )
}

export default App
