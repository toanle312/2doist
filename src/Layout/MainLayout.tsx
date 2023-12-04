import React, { useContext, useState } from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import HomePage from "@/Pages/HomePage/HomePage";
import "./MainLayout.scss";
import { ThemeContext } from "@/Context/ThemeContext";
import { ConfigProvider, theme } from "antd";

const MainLayout: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidth] = useState<number>(222);

  const { isDarkTheme } = useContext(ThemeContext);

  console.log(theme.darkAlgorithm);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? theme.darkAlgorithm : undefined,
        components: {
          Select: {
            controlItemBgActive: "#db4c3f",
            optionSelectedColor: "white",
            colorPrimaryHover: "#808080",
            controlOutline: "unset",
          },
          Switch: {
            colorPrimary: "rgba(0,0,0,0.45)",
            colorPrimaryHover: "white",
          },
        },
      }}
    >
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
    </ConfigProvider>
  );
};

export default MainLayout;
