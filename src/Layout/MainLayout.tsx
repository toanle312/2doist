import React, { useContext, useState } from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import HomePage from "@/Pages/HomePage/HomePage";
import "./MainLayout.scss";
import { ThemeContext } from "@/Context/ThemeContext";
import { ConfigProvider, theme } from "antd";
import { useAppSelector, useFetch } from "@/Hooks";
import { fetchTodosByUserID } from "@/Redux/Todos/TodosSlice";
import { fetchProjects } from "@/Redux/Projects/ProjectsSlice";
import LoadingPage from "@/Pages/LoadingPage/LoadingPage";
import Spinning from "@/Pages/LoadingPage/Spinning";

const MainLayout: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidth] = useState<number>(222);

  const { isDarkTheme } = useContext(ThemeContext);

  const user = useAppSelector((state) => state.auth.account);

  const [todoLoading] = useFetch(fetchTodosByUserID(user.uid));
  const [projectLoading] = useFetch(fetchProjects());

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
            colorPrimary: "rgba(0,0,0,0.45)!important",
            colorPrimaryHover: "rgb(210,211,213)!important",
            colorTextQuaternary: "rgb(210,211,213)!important",
            colorTextTertiary: "rgba(0,0,0,0.45)!important",
          },
          Button: {
            colorBgTextActive: "#808080",
          },
        },
      }}
    >
      <div className="w-full">
        <div className={`main-layout ${isDarkTheme ? "dark-mode" : ""}`}>
          {/* Navbar contain Sidebar */}
          <Navbar
            setIsOpenMenu={setIsOpenMenu}
            isOpenMenu={isOpenMenu}
            sidebarWidth={sidebarWidth}
          />
          {todoLoading && projectLoading ? (
            <LoadingPage loadingOnly />
          ) : (
            <>
              <Sidebar
                sidebarWidth={sidebarWidth}
                setSideBarWidth={setSidebarWidth}
                isOpen={isOpenMenu}
              />
              <HomePage isOpenMenu={isOpenMenu} sidebarWidth={sidebarWidth} />
            </>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
