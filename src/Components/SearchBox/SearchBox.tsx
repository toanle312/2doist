import React from 'react'
import { closeBtn, searchIcon } from '../../Assets'
import "./SearchBox.scss"

type Props = {
  width: number;
}

const SearchBox : React.FC<Props> = ({width=300}) => {
  return (
    <div
    style={{width: width-80}}
    className={`flex bg-[hsla(0,0%,100%,0.2)] rounded-sm relative w-[300px] min-w-[142px] max-w-[315px]`}>
      <input
        type="text"
        className="input outline-none bg-transparent w-full rounded-sm pl-9 py-1"
        placeholder="Search"
      />
      <img
        src={searchIcon}
        alt="search"
        className="absolute left-[5px] top-[4px] bottom-[4px]"
      />
      <button className="closeBtn absolute right-[5px] top-[4px] bottom-[4px] p-1">
        <img src={closeBtn} alt="close-button" className=" right-[5px] " />
      </button>
    </div>
  )
}

export default SearchBox