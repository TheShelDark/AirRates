import React from 'react'

function CardSection(props) {
  return (
    <div className='w-full grid gap-4 grid-cols-3 grid-rows-1 justify-items-center items-start mt-5'>
        {props.children}
    </div>
  )
}

export default CardSection