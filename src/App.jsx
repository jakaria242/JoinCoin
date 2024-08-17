import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import Friends from './pages/friends/Friends';
import Boost from './pages/boost/Boost';



function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(

      <>
        <Route path='/' element={<Home/>}/>
        <Route path='/friends' element={<Friends/>}/>
        <Route path='/boost' element={<Boost/>}/>
        <Route path='/earn' element={<Boost/>}/>
      </>

    )
  );

  return (
    <RouterProvider router={router}/>
  )
}

export default App