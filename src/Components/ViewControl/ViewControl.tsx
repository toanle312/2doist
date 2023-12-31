import { ViewContext } from "@/Context/ViewContext";
import React, { useContext, useState } from "react";
import "./ViewControl.scss";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DownOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import GroupingList from "./GroupingList";
import { GROUPING_TYPE, SORTING_TYPE, TODO_PAGES } from "@/Utils";
import { grouping, sorting } from "@/Assets";
import SortingList from "./SortingList";
import DirectionList from "./DirectionList";
import { ThemeContext } from "@/Context/ThemeContext";

type Props = {
  setIsOpenViewControl: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewControl: React.FC<Props> = ({ setIsOpenViewControl }) => {
  const {
    listView,
    setListView,
    groupingType,
    sortingType,
    direction,
    setGroupingType,
    setSortingType,
  } = useContext(ViewContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const [isShowGroupingList, setIsShowGroupingList] = useState<boolean>(false);
  const [isShowSortingList, setIsShowSortingList] = useState<boolean>(false);
  const [isShowDirectionList, setIsShowDirectionList] =
    useState<boolean>(false);
  return (
    <>
      <div
        className="w-full h-[100vh] bg-transparent fixed top-0 right-0 z-10"
        onClick={() => {
          setIsOpenViewControl(false);
        }}
      ></div>
      <div className={`view-control ${isDarkTheme ? "dark" : ""}`}>
        <div className="w-full">
          <section className="p-3">
            <span className="font-bold">View</span>
            <div className="mt-3 flex p-1 bg-gray-100 rounded-md w-full justify-between gap-1">
              {[
                { name: "List", icon: <MenuOutlined /> },
                {
                  name: "Board",
                  icon: <MenuOutlined style={{ transform: "rotate(90deg)" }} />,
                },
              ].map((item: any) => {
                return (
                  <div
                    key={item.name}
                    className={`view-selection ${
                      item.name === listView ? "active" : ""
                    }`}
                    onClick={() => {
                      setListView(item.name);
                    }}
                  >
                    <div>{item.icon}</div>
                    <span className="m-auto">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </section>
          <hr />
          <section className="p-3">
            <span className="font-bold">Sort by</span>
            <div className="mt-1">
              <section
                onClick={() => {
                  setIsShowGroupingList(true);
                }}
                className={`relative mx-[-6px] rounded-md p-2 cursor-pointer ${
                  isDarkTheme ? " hover:bg-[#363636]" : " hover:bg-[#f5f5f5]"
                } `}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <img
                      src={grouping}
                      alt="icon"
                      className={`bg-gray-100 rounded-md`}
                    />
                    <span>Grouping</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span>{groupingType}</span>
                    <DownOutlined style={{ fontSize: "12px" }} />
                  </div>
                  {isShowGroupingList && (
                    <GroupingList
                      page={TODO_PAGES.TODAY}
                      setIsShowGroupingList={setIsShowGroupingList}
                    />
                  )}
                </div>
              </section>

              <section
                onClick={() => {
                  setIsShowSortingList(true);
                }}
                className={`relative mx-[-6px] rounded-md p-2 cursor-pointer ${
                  isDarkTheme ? " hover:bg-[#363636]" : " hover:bg-[#f5f5f5]"
                } `}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <img
                      src={sorting}
                      alt="icon"
                      className={`bg-gray-100 rounded-md`}
                    />

                    <span>Sorting</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span>{sortingType}</span>
                    <DownOutlined style={{ fontSize: "12px" }} />
                  </div>
                  {isShowSortingList && (
                    <SortingList
                      page={TODO_PAGES.TODAY}
                      setIsShowSortingList={setIsShowSortingList}
                    />
                  )}
                </div>
              </section>
              {sortingType !== SORTING_TYPE.DEFAULT && (
                <section
                  onClick={() => {
                    setIsShowDirectionList(true);
                  }}
                  className={`relative mx-[-6px] rounded-md p-2 pl-4 cursor-pointer ${
                    isDarkTheme ? " hover:bg-[#363636]" : " hover:bg-[#f5f5f5]"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      {direction > 0 ? (
                        <ArrowUpOutlined style={{ fontSize: "12px" }} />
                      ) : (
                        <ArrowDownOutlined style={{ fontSize: "12px" }} />
                      )}
                      <span>Direction</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span>
                        {direction >= 0 ? "Ascending (default)" : "Descending"}
                      </span>
                      <DownOutlined style={{ fontSize: "12px" }} />
                    </div>
                    {isShowDirectionList && (
                      <DirectionList
                        page={TODO_PAGES.TODAY}
                        setIsShowDirectionList={setIsShowDirectionList}
                      />
                    )}
                  </div>
                </section>
              )}
            </div>
          </section>
          <hr />
          <section className="p-3">
            <span className="font-bold">Filter by</span>
            <div className="mt-1 text-center">Nothing</div>
          </section>
          {(sortingType !== SORTING_TYPE.DEFAULT ||
            groupingType !== GROUPING_TYPE.DEFAULT) && (
            <>
              <hr />
              <section
                className="p-[6px]"
                onClick={() => {
                  setGroupingType(GROUPING_TYPE.DEFAULT);
                  setSortingType(SORTING_TYPE.DEFAULT);
                }}
              >
                <div className=" rounded-md p-[6px] cursor-pointer hover:bg-[#f5f5f5] text-primary">
                  Reset all
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewControl;
