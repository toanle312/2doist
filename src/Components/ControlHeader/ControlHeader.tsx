import { ThemeContext } from "@/Context/ThemeContext";
import { ViewContext } from "@/Context/ViewContext";
import { useDate } from "@/Hooks/useDate";
import { ControlOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import "@/Pages/ControlPage/style.scss";
import "./ControlHeader.scss";
import ViewControl from "../ViewControl/ViewControl";

const ControlHeader = () => {
  const { today } = useDate();
  const { isDarkTheme } = useContext(ThemeContext);
  const [isOpenViewControl, setIsOpenViewControl] = useState<boolean>(false);
  return (
    <div className="today-header__content">
      <div>
        <span className="text-[20px] font-bold mr-2">Today</span>
        <span className="text-[14px] text-textGray">{today}</span>
      </div>
      <section className="relative">
        <button
          className={`control-btn ${isDarkTheme ? "dark-mode" : ""}`}
          onClick={() => {
            setIsOpenViewControl(!isOpenViewControl);
          }}
        >
          <ControlOutlined /> View
        </button>
        {isOpenViewControl ? (
          <ViewControl setIsOpenViewControl={setIsOpenViewControl} />
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default ControlHeader;
