import { useState } from 'react'

import './App.css'
import Navbar from './component/navbar/navbar'


import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Blog from './component/blog/Blog'
import NewPost from './component/blog/NewPost'
import SinglePostVeiw from './component/blog/postDetails'
import EditPost from './component/blog/editPost'


function App() {

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Blog />} />
          <Route path='/write' element={<NewPost />} />
          <Route path='/posts/:id' element={< SinglePostVeiw/>} />
          <Route path='/editposts/:id' element={< EditPost/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
