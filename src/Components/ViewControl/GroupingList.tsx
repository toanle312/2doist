import React, { useContext, useMemo } from "react";
import "./ViewControl.scss";
import { ViewContext } from "@/Context/ViewContext";

type Props = {
  setIsShowGroupingList: React.Dispatch<React.SetStateAction<boolean>>;
  page: string;
};

const GroupingList: React.FC<Props> = ({ page, setIsShowGroupingList }) => {
  const list = useMemo(() => {
    return ["None (default)", "Due date", "Date added", "Priority"];
  }, [page]);

  const { setGroupingType } = useContext(ViewContext);
  return (
    <>
      <div
        className="w-full h-[100vh] bg-transparent fixed top-0 right-0 cursor-default"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowGroupingList(false);
        }}
      ></div>
      <ul className="grouping-list">
        {list.map((item) => {
          return (
            <li
              className={`grouping-list__item`}
              key={item}
              onClick={(e) => {
                e.stopPropagation();
                setGroupingType(item);
                setIsShowGroupingList(false);
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

export default GroupingList;
