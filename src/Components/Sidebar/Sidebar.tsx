import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SideBarItems } from "../../Data";
import "./SideBar.scss";
import { NavLink } from "react-router-dom";

type Props = {
  sidebarWidth: number;
  setSideBarWidth: React.Dispatch<React.SetStateAction<number>>;
  isOpen: boolean;
};

const Sidebar: React.FC<Props> = ({setSideBarWidth, sidebarWidth, isOpen}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const startResizing = useCallback(() => {
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
        currentWidth = (currentWidth > 395) ? 395 : (currentWidth < 222) ? 222 : currentWidth;
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


  return (
    <div
      ref={sidebarRef}
      style={{ width: sidebarWidth }}
      onMouseDown={(e) => e.preventDefault()}
      className={`sidebar ${isOpen ? 'show-sidebar' : 'hide-sidebar'}`}
    >
      <ul className="px-[15px] pt-[30px] flex-1 w-full h-[calc(100vh-48px)]">
        {SideBarItems.map((sideBarItem) => (
          <NavLink to={sideBarItem.path} key={sideBarItem.id} className="sidebarItem flex">
            <img src={sideBarItem.icon} alt={sideBarItem.content} />
            <p className="ml-1">{sideBarItem.content}</p>
          </NavLink>
        ))}
      </ul>
      <div
        id="resize"
        className="resizeControl h-[100%] w-[5px] cursor-col-resize"
        onMouseDown={startResizing}
      ></div>
    </div>
  );
};

export default Sidebar;
