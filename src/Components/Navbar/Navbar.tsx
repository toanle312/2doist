import React from 'react'
import { homeBtn, menu } from '../../assets'
import SearchBox from '../SearchBox/SearchBox'

const Navbar = () => {
  return (
    <div className="w-full flex bg-primary p-2">
      {/* Left control */}
      <div className="flex gap-2">
        <img src={menu} alt="menu" />
        <img src={homeBtn} alt="homeBtn" />
        <SearchBox/>
      </div>
      {/* Right control */}
      <div>

      </div>
    </div>
  )
}

export default Navbar