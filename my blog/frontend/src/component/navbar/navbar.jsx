import React from 'react'
import './navbar.css'
const Navbar = () => {
  return (
<div className="navbar">
    <div><h2>LOGO</h2></div>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/write">Write Post</a></li>
        </ul>
    </nav>
</div>
  )
}

export default Navbar