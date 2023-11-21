import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SideBarItems } from "@/Data";
import "./SideBar.scss";
import { NavLink } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/Hooks";
import { addProject } from "@/Redux/Projects/ProjectsSlice";
import ProjectList from "../Projects/ProjectList";

type Props = {
  sidebarWidth: number;
  setSideBarWidth: React.Dispatch<React.SetStateAction<number>>;
  isOpen: boolean;
};

/**
 *
 * @param setSideBarWidth function to set the sidebar width
 * @param sidebarWidth the sidebar width
 * @param isOpen prop to check if the sidebar is open
 * @returns
 */
const Sidebar: React.FC<Props> = ({
  setSideBarWidth,
  sidebarWidth,
  isOpen,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      const currentPos = sidebarRef.current?.offsetLeft as number;

      if (isResizing) {
        let currentWidth = e.clientX - currentPos;
        currentWidth =
          currentWidth > 395 ? 395 : currentWidth < 222 ? 222 : currentWidth;
        setSideBarWidth(currentWidth);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize as any);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", resize as any);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing, isResizing]);
  const dispatch = useAppDispatch();

  const handleAddNewProject = async () => {
    try {
      await dispatch(addProject("Untitled project")).unwrap();
    } catch (error) {
      console.error(error);
      throw new Error("Can not add new project");
    }
  };

  return (
    <div
      ref={sidebarRef}
      style={{ width: sidebarWidth }}
      className={`sidebar ${isOpen ? "show-sidebar" : "hide-sidebar"}`}
    >
      <section className="flex px-[8px] pt-[18px] flex-col justify-between w-full ml-1">
        <ul className="w-full">
          {SideBarItems.map((sideBarItem) => (
            <NavLink
              to={sideBarItem.path}
              key={sideBarItem.id}
              className="sidebarItem flex"
            >
              <img src={sideBarItem.icon} alt={sideBarItem.content} />
              <p className="ml-1">{sideBarItem.content}</p>
            </NavLink>
          ))}
        </ul>
        <section className="flex-1">
          <hr className="my-2" />
          <ProjectList />
        </section>
        <div
          className="mb-[9px] sidebarItem text-medium flex gap-2"
          onClick={handleAddNewProject}
        >
          <PlusOutlined />
          New project
        </div>
      </section>
      <div
        id="resize"
        className="resizeControl h-[100%] w-[5px] cursor-col-resize"
        onMouseDown={startResizing}
      ></div>
    </div>
  );
};

export default Sidebar;
