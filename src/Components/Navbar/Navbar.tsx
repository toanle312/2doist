import React from "react";
import { homeBtn, menu } from "../../assets";
import SearchBox from "../SearchBox/SearchBox";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { NESTED_URL } from "../../Utils";
import { UserInfor } from "../UserInfor/UserInfor";

type Props = {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarWidth: number;
};

const Navbar: React.FC<Props> = ({ isOpenMenu, setIsOpenMenu, sidebarWidth }) => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full flex bg-primary p-2 justify-between fixed top-0 left-0">
      {/* Left control */}
      <div className="flex gap-1">
        <img
          src={menu}
          alt="menu"
          onClick={() => {
            setIsOpenMenu(!isOpenMenu);
          }}
          className="navBtn"
        />
        <img
          src={homeBtn}
          alt="homeBtn"
          className="navBtn"
          onClick={() => {
            navigate(NESTED_URL.TODAY);
          }}
        />
        <SearchBox width={isOpenMenu ? sidebarWidth : 300} />
      </div>
      {/* Right control */}
      <div className="flex">
        <UserInfor/>
      </div>
    </div>
  );
};

export default Navbar;
