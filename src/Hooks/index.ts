import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/Redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { User } from "firebase/auth";
import { auth } from "@/Firebase/config";
import useTodoList from "./useTodoList";

export { useTodoList };
//useDispatch hook with types.
export const useAppDispatch = () => useDispatch<AppDispatch>();
//useSelector hook with types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) =>
      setUser(user as User)
    );
    return () => {
      unsubscribed();
    };
  }, []);

  return user;
};

export const useFetch = (fetchCallback: any): any[] => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchCallback).unwrap();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        throw new Error("Can not fetch data");
      }
    })();
  }, []);

  return [isLoading, setIsLoading];
};
