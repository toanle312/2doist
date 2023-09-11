import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./HomePage.scss"

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
          : { margin: "auto", marginTop: "48px" }
      }
      className="h-[--control-height] bg-white w-full text-black px-[55px] pb-[84px]
      home-page"
    >
      <Outlet />
    </div>
  );
};

export default HomePage;
