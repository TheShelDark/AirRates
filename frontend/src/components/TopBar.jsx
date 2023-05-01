import React from 'react'
import logo from '../logo.png'
import { useNavigate } from 'react-router-dom';


function TopBar() {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/');
      }
  return (
    <div className='w-full h-20 dark:bg-gray-800 flex drop-shadow-xl flex-row justify-between p-4'>
        <img className="hover:cursor-pointer" onClick={handleClick} src={logo} alt="Logo" />
        <a className='self-center text-white'>Docs</a>
    </div>
  )
}

export default TopBar