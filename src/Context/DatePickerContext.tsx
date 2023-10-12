import { ReactNode, createContext, useState } from "react";

export const DatePickerContext = createContext<{
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}>({} as any);

type Props = {
  children: ReactNode;
};


const DatePickerProvider:React.FC<Props> = ({ children }: any) => {
  // Show current month and current year when scroll calendar
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  return (
    <DatePickerContext.Provider
      value={{
        month,
        setMonth,
        year,
        setYear,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export default DatePickerProvider;
