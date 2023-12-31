import React, { useContext, useMemo } from "react";
import "./ViewControl.scss";
import { ViewContext } from "@/Context/ViewContext";

type Props = {
  setIsShowSortingList: React.Dispatch<React.SetStateAction<boolean>>;
  page: string;
};

const SortingList: React.FC<Props> = ({ page, setIsShowSortingList }) => {
  const list = useMemo(() => {
    return ["Manual (default)", "Name", "Due date", "Date added", "Priority"];
  }, [page]);

  const { setSortingType } = useContext(ViewContext);
  return (
    <>
      <div
        className="w-full h-[100vh] bg-transparent fixed top-0 right-0 cursor-default"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowSortingList(false);
        }}
      ></div>
      <ul className="sorting-list">
        {list.map((item) => {
          return (
            <li
              className={`sorting-list__item`}
              key={item}
              onClick={(e) => {
                e.stopPropagation();
                setSortingType(item);
                setIsShowSortingList(false);
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

export default SortingList;
