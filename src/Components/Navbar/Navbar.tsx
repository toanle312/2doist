import React, { useContext } from "react";
import { homeBtn, menu, themeBtn } from "@/Assets";
import SearchBox from "@/Components/SearchBox/SearchBox";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { NESTED_URL } from "@/Utils";
import { UserInfor } from "@/Components/UserInfor/UserInfor";
import { ThemeContext } from "@/Context/ThemeContext";
import { Switch } from "antd";

type Props = {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarWidth: number;
};

const Navbar: React.FC<Props> = ({
  isOpenMenu,
  setIsOpenMenu,
  sidebarWidth,
}) => {
  const navigate = useNavigate();
  const { setDarkTheme, isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="w-full flex bg-primary p-2 justify-between fixed top-0 left-0 h-[48px] items-center">
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
      <div className="flex items-center gap-2">
        <Switch
          className="bg-slate-100"
          onClick={() => {
            setDarkTheme(!isDarkTheme);
          }}
        ></Switch>

        <UserInfor />
      </div>
    </div>
  );
};
export default Navbar;
