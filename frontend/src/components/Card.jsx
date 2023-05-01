import React from 'react'
import { useNavigate } from 'react-router-dom';

function Card(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/airport/' + props.name);
  }
  return (
    <div onClick={handleClick} className="rounded-lg border-solid border-slate-600 border-2 p-6 hover:opacity-60 hover:cursor-pointer">
            <img src={props.image} alt="Logo" />
            <h1 className='mt-5 text-white'>{props.label}</h1>
    </div>
  )
}

export default Card