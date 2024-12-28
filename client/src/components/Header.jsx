import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

const Header = () => {
  const {CurrentUser} = useSelector(state => state.user)
  console.log(CurrentUser)
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between item-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Sahad</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex item-center' >
          <input className='bg-transparent focus:outline-none w-24 sm:w-64' type="text"  placeholder='search...' />
          <FaSearch className='text-slate-500' />
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
          </Link>
          <Link to='/profile'>
          {CurrentUser ? (
            <img className='rounded-full h-7 w-7 object-cover ' src={CurrentUser.avatar} alt="profile" />

          ): <li className='sm:inline text-slate-700 hover:underline'>Sign In</li>
          
          }
          
          
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header