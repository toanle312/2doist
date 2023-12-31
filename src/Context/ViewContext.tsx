import { Dispatch, ReactNode, createContext, useState } from "react";

export const ViewContext = createContext<{
  listView: string;
  setListView: Dispatch<React.SetStateAction<string>>;
  groupingType: string;
  setGroupingType: Dispatch<React.SetStateAction<string>>;
  sortingType: string;
  setSortingType: Dispatch<React.SetStateAction<string>>;
  direction: number;
  setDirection: Dispatch<React.SetStateAction<number>>;
}>({} as any);

type Props = {
  children: ReactNode;
};

const ViewProvider: React.FC<Props> = ({ children }) => {
  const [listView, setListView] = useState<string>("List");
  const [groupingType, setGroupingType] = useState<string>("None (default)");
  const [sortingType, setSortingType] = useState<string>("Manual (default)");
  const [direction, setDirection] = useState<number>(1);
  return (
    <ViewContext.Provider
      value={{
        listView,
        setListView,
        groupingType,
        setGroupingType,
        sortingType,
        setSortingType,
        direction,
        setDirection,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export default ViewProvider;
