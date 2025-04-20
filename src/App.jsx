import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import BookDetailsPage from './pages/BookDetailsPage'
import { Route, Routes } from 'react-router-dom'
import PageHeader from './components/PageHeader'


function App() {

  return (
    <div>
      <PageHeader/>
      <div className='flex'>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/book/:id' element={<BookDetailsPage/>}/>
          </Routes>
      </div>
    </div>
  )
}

export default App