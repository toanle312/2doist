import { ThemeContext } from "@/Context/ThemeContext";
import { useDate } from "@/Hooks/useDate";
import { ControlOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import "@/Pages/ControlPage/style.scss";
import "./ControlHeader.scss";
import ViewControl from "../ViewControl/ViewControl";
import { TODO_PAGES } from "@/Utils";
import { useAppSelector } from "@/Hooks";

type Props = {
  page?: string;
};

const ControlHeader: React.FC<Props> = ({ page }) => {
  const { today } = useDate();
  const currentProject = useAppSelector(
    (state) => state.projects.currentProject
  );
  const { isDarkTheme } = useContext(ThemeContext);
  const [isOpenViewControl, setIsOpenViewControl] = useState<boolean>(false);
  return (
    <div className="page-header__content">
      <div>
        <span className="text-[20px] font-bold mr-2">
          {page === "Project" ? currentProject?.projectName : page}
        </span>
        {page === TODO_PAGES.TODAY ? (
          <span className="text-[14px] text-textGray">{today}</span>
        ) : (
          ""
        )}
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
