import { ReactNode, createContext, useState } from "react";

export const DatePickerContext = createContext<{
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  tempMonth: number;
  setTempMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  tempYear: number;
  setTempYear: React.Dispatch<React.SetStateAction<number>>;
  currentHoverDate: string;
  setCurrentHoverDate: React.Dispatch<React.SetStateAction<string>>;
  numberOfTasks: number;
  setNumberOfTasks: React.Dispatch<React.SetStateAction<number>>;
}>({} as any);

type Props = {
  children: ReactNode;
};

const DatePickerProvider: React.FC<Props> = ({ children }: any) => {
  // Show current month and current year when scroll calendar
  const [month, setMonth] = useState<number>(0);
  const [tempMonth, setTempMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [tempYear, setTempYear] = useState<number>(0);
  const [currentHoverDate, setCurrentHoverDate] = useState<string>("");
  const [numberOfTasks, setNumberOfTasks] = useState<number>(0);
  return (
    <DatePickerContext.Provider
      value={{
        month,
        setMonth,
        tempMonth,
        setTempMonth,
        year,
        setYear,
        tempYear,
        setTempYear,
        currentHoverDate,
        setCurrentHoverDate,
        numberOfTasks,
        setNumberOfTasks,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export default DatePickerProvider;
