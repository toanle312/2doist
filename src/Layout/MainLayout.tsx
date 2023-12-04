import React, { useContext, useState } from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import HomePage from "@/Pages/HomePage/HomePage";
import "./MainLayout.scss";
import { ThemeContext } from "@/Context/ThemeContext";

const MainLayout: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidth] = useState<number>(222);

  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="w-full">
      <div className={`main-layout ${isDarkTheme && "dark-mode"}`}>
        {/* Navbar contain Sidebar */}
        <Navbar
          setIsOpenMenu={setIsOpenMenu}
          isOpenMenu={isOpenMenu}
          sidebarWidth={sidebarWidth}
        />
        <Sidebar
          sidebarWidth={sidebarWidth}
          setSideBarWidth={setSidebarWidth}
          isOpen={isOpenMenu}
        />
        <HomePage isOpenMenu={isOpenMenu} sidebarWidth={sidebarWidth} />
      </div>
    </div>
  );
};

export default MainLayout;
