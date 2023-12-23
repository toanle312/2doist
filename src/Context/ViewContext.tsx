import { Dispatch, ReactNode, createContext, useState } from "react";

export const ViewContext = createContext<{
  listView: string;
  setListView: Dispatch<React.SetStateAction<string>>;
}>({} as any);

type Props = {
  children: ReactNode;
};

const ViewProvider: React.FC<Props> = ({ children }) => {
  const [listView, setListView] = useState("List");
  return (
    <ViewContext.Provider value={{ listView, setListView }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewProvider;
