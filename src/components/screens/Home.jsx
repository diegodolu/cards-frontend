import React from 'react'
import Sidebar from '../sections/sidebar/Sidebar'
import Main from '../sections/main/Main'

const Home = () => {
  return (
    <div className='flex flex-row my-16 mx-48 bg-white w-full rounded-lg'>
      <Sidebar/>
      <Main/>
    </div>
  )
}

export default Home
