import React from 'react'
import Navbar from '../NavBarr/navbarr'
import '../Mainpage/mainpage.css'
import Card from '../Card/card'

function Mainpage() {
  return (
    <div className="mainpage">
      <Navbar />
      <div className="twoclomn">
        <div className="leftmp">
        <p className="fueltrix">Fueltrix</p>
        </div>
        <div className="rightmp">
        
        </div>
      </div>
    </div>
  )
}

export default Mainpage
