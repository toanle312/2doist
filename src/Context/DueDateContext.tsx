import { useDate } from "@/Hooks/useDate";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import {
  tomorrow as tomorrowIcon,
  today as todayIcon,
  nextWeek as nextWeekIcon,
  nextWeekend as nextWeekendIcon,
  noDate,
} from "@/Assets";
import { TDateList, TShowDueDate } from "@/interface";
import { MODAL_TYPES } from "@/Utils";

export const DueDateContext = createContext<{
  showDueDate: TShowDueDate;
  setShowDueDate: React.Dispatch<React.SetStateAction<TShowDueDate>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  isOpenDueDate: boolean;
  setIsOpenDueDate: React.Dispatch<React.SetStateAction<boolean>>;
  dateList: TDateList[];
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}>({} as any);

type Props = {
  children: ReactNode;
};

const DueDateProvider: React.FC<Props> = ({ children }: any) => {
  // Show current month and current year when scroll calendar
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  const [type, setType] = useState<string>("");

  const [showDueDate, setShowDueDate] = useState<TShowDueDate>({
    color: "",
    text: "Due Date",
  });

  const [isOpenDueDate, setIsOpenDueDate] = useState<boolean>(false);

  const { today, tomorrow, nextWeek, nextWeekend } = useDate();

  const dateList = useMemo(() => {
    return [
      {
        id: "Today",
        icon: todayIcon,
        date: today,
        content: "Today",
        color: "#4b9244",
      },
      {
        id: "Tomorrow",
        icon: tomorrowIcon,
        date: tomorrow,
        content: "Tomorrow",
        color: "#ad6200",
      },
      {
        id: "Next weekend",
        icon: nextWeekendIcon,
        date: nextWeekend,
        content: "Next weekend",
        color: "#246fe0",
      },
      {
        id: "Next week",
        icon: nextWeekIcon,
        date: nextWeek,
        content: "Next week",
        color: "#69cec2",
      },
      {
        id: "No Date",
        icon: noDate,
        date: "",
        content: "No Date",
        color: "",
      },
    ];
  }, [today, tomorrow, nextWeek, nextWeekend]);

  const contextValue = useMemo(() => {
    return {
      showDueDate,
      setShowDueDate,
      isOpenDueDate,
      setIsOpenDueDate,
      dateList,
      month,
      setMonth,
      year,
      setYear,
      type,
      setType,
    };
  }, [
    showDueDate,
    setShowDueDate,
    isOpenDueDate,
    setIsOpenDueDate,
    dateList,
    month,
    setMonth,
    year,
    setYear,
    type,
    setType,
  ]);

  return (
    <DueDateContext.Provider value={contextValue}>
      {children}
    </DueDateContext.Provider>
  );
};

export default DueDateProvider;
