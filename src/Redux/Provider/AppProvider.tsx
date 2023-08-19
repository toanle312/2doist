import React, { useState } from 'react';
import { auth } from '../../firebase/config';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import store from 'src/Redux/store';
import { Provider } from 'react-redux';

export default function AppProvider({ children }: any) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const unsubcribed = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoading(false);
        navigate('/home');
        return;
      }
      setIsLoading(false);
      navigate('/');
    });

    // clean function
    return () => {
      unsubcribed();
    };
  }, []);

  return (
    <Provider store={ store }>
      {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
    </Provider>
  );
}