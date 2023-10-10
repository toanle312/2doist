import React, { useState } from "react";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

import store from "src/Redux/store";
import { Provider } from "react-redux";
import LoadingPage from "src/Pages/LoadingPage/LoadingPage";
import { PAGE_URL } from "src/Utils";

type Props = {
  children: JSX.Element;
};

const AppProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Check login in app
   */
  React.useEffect(() => {
    const unsubcribed = auth.onAuthStateChanged((user) => {
      // if user is valid then redirect to home page
      if (user) {
        setIsLoading(false);
        if (location.pathname === PAGE_URL.LOGIN || location.pathname === "/") {
          navigate(PAGE_URL.HOME);
        }
        return;
      }

      // if user is invalid then stay in login page
      setIsLoading(false);
      navigate("/");
    });

    // cleanup function
    return () => {
      unsubcribed();
    };
  }, []);

  return (
    <Provider store={store}>{isLoading ? <LoadingPage /> : children}</Provider>
  );
};

export default AppProvider;
