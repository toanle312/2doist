import { ViewContext } from "@/Context/ViewContext";
import React, { useContext } from "react";
import "./ViewControl.scss";
import {
  DownOutlined,
  GroupOutlined,
  MenuOutlined,
  SwapOutlined,
} from "@ant-design/icons";

type Props = {
  setIsOpenViewControl: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewControl: React.FC<Props> = ({ setIsOpenViewControl }) => {
  const { listView, setListView } = useContext(ViewContext);
  return (
    <>
      <div
        className="w-full h-[100vh] bg-transparent fixed top-0 right-0 z-10"
        onClick={() => {
          setIsOpenViewControl(false);
        }}
      ></div>
      <div className={`view-control`}>
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
              <section className="mx-[-6px] rounded-md p-2 cursor-pointer hover:bg-gray-200">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <GroupOutlined
                      style={{ fontSize: "20px", color: "#808080" }}
                    />
                    <span>Grouping</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Your choose</span>
                    <DownOutlined style={{ fontSize: "12px" }} />
                  </div>
                </div>
              </section>
              <section className="mx-[-6px] rounded-md p-2 cursor-pointer hover:bg-gray-200">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <SwapOutlined
                      style={{
                        fontSize: "20px",
                        color: "#808080",
                        transform: "rotate(90deg)",
                      }}
                    />
                    <span>Sorting</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Your choose</span>
                    <DownOutlined style={{ fontSize: "12px" }} />
                  </div>
                </div>
              </section>
            </div>
          </section>
          <hr />
          <section className="p-3">
            <span className="font-bold">Filter by</span>
          </section>
          <hr />
          <section className="p-[6px]">
            <div className=" rounded-md p-[6px] cursor-pointer hover:bg-gray-200">
              Reset all
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ViewControl;
