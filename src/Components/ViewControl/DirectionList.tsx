import React, { useContext, useMemo } from "react";
import "./ViewControl.scss";
import { ViewContext } from "@/Context/ViewContext";

type Props = {
  setIsShowDirectionList: React.Dispatch<React.SetStateAction<boolean>>;
  page: string;
};

const DirectionList: React.FC<Props> = ({ page, setIsShowDirectionList }) => {
  const list = useMemo(() => {
    return ["Ascending (default)", "Descending"];
  }, [page]);

  const { setDirection } = useContext(ViewContext);
  return (
    <>
      <div
        className="w-full h-[100vh] bg-transparent fixed top-0 right-0 cursor-default"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowDirectionList(false);
        }}
      ></div>
      <ul className="direction-list">
        {list.map((item) => {
          return (
            <li
              className={`direction-list__item`}
              key={item}
              onClick={(e) => {
                e.stopPropagation();
                setDirection(item === "Ascending (default)" ? 1 : -1);
                setIsShowDirectionList(false);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DirectionList;
