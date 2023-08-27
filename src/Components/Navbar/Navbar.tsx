import React from "react";
import { homeBtn, menu } from "../../assets";
import SearchBox from "../SearchBox/SearchBox";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { NESTED_URL } from "../../Utils";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import authSlice, { logoutUser } from "../../Redux/Auth/AuthSlice";
import { auth } from "../../firebase/config";
import { UserInfor } from "../UserInfor/UserInfor";

type Props = {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarWidth: number;
};

const Navbar: React.FC<Props> = ({ isOpenMenu, setIsOpenMenu, sidebarWidth }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };


  
  return (
    <div className="w-full flex bg-primary p-2 justify-between">
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
