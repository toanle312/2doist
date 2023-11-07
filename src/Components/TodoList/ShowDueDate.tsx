import { DueDateContext } from "@/Context/DueDateContext";
import { CalendarOutlined } from "@ant-design/icons";
import { Calendar } from "antd";
import React from "react";
type Props = {
  dueDate: string;
};
const ShowDueDate: React.FC<Props> = ({ dueDate }) => {
  const { dateList } = React.useContext(DueDateContext);
  const findDate = dateList?.find((dateItem) => dateItem.date === dueDate) || {
    color: "#692ec2",
    icon: <CalendarOutlined style={{ fontSize: "18px", marginRight: "4px" }} />,
    content: dueDate.split(" ").slice(1).join(" "),
  };
  return (
    <p
      className="text-small flex items-center"
      style={{ color: findDate?.color }}
    >
      {typeof findDate.icon === "string" ? (
        <img src={findDate?.icon} alt="icon" />
      ) : (
        findDate.icon
      )}
      {findDate?.content}
    </p>
  );
};

export default ShowDueDate;
