import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./HomePage.scss";
import { ThemeContext } from "@/Context/ThemeContext";

type Props = {
  isOpenMenu: boolean;
  sidebarWidth: number;
};

const HomePage: React.FC<Props> = ({ isOpenMenu, sidebarWidth }) => {
  return (
    <div
      style={
        isOpenMenu
          ? {
              marginLeft: sidebarWidth,
              width: `calc(100% - ${sidebarWidth}px`,
            }
          : {
              margin: "auto",
              marginTop: "48px",
            }
      }
      className={`home-page h-[--control-height] w-full px-[55px] pb-[36px]`}
    >
      <Outlet />
    </div>
  );
};

export default HomePage;
