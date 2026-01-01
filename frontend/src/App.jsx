import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddUpdate from './components/AddUpdate'
import Add from './pages/Add'
import Update from './pages/Update'
import Detail from './pages/Detail'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        {/* <Route path='/update/:id' element={<AddUpdate />} /> */}
        <Route path='/create' element={<Add />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
