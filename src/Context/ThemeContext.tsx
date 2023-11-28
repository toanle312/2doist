import { Dispatch, ReactNode, createContext, useState } from "react";

export const ThemeContext = createContext<{
  isDarkTheme: boolean;
  setDarkTheme: Dispatch<React.SetStateAction<boolean>>;
}>({} as any);

type Props = {
  children: ReactNode;
};

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isDarkTheme, setDarkTheme] = useState(false);
  return (
    <ThemeContext.Provider value={{ isDarkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
