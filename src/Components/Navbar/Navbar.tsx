import React, { useState } from "react";
import { homeBtn, menu } from "../../assets";
import SearchBox from "../SearchBox/SearchBox";
import Sidebar from "../Sidebar/Sidebar";
import "./Navbar.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { PAGE_URL } from "../../Utils";

const Navbar: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidth] = useState(222);
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex bg-primary p-2">
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
              navigate(PAGE_URL.TODAY);
            }}
          />
          <SearchBox width={isOpenMenu ? sidebarWidth : 300} />
        </div>
        {/* Right control */}
        <div></div>
      </div>

      <Sidebar
        sidebarWidth={sidebarWidth}
        setSideBarWidth={setSidebarWidth}
        isOpen={isOpenMenu}
      />

      <div
        style={
          isOpenMenu
            ? {
                marginLeft: sidebarWidth,
                width: `calc(100% - ${sidebarWidth}px`,
              }
            : { margin: "auto" }
        }
        className="h-[100vh] bg-white w-full text-black px-[55px] pb-[84px]"
      >
        <Outlet />
      </div>

    </>
  );
};

export default Navbar;
