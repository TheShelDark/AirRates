import React from 'react'
import TopBar from './TopBar'

function PageLayout(props) {
  return (
    <div id="page-container">
        <div id="content-wrap">
            <TopBar />
            <div className='my-16 mx-36' id='container'>
                {props.children}
            </div>   
        </div>
        <footer className='dark:bg-gray-800 drop-shadow-xl text-white' id="footer">© AirRates</footer>
    </div>
  )
}

export default PageLayout