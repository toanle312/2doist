import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/Redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { User } from "firebase/auth";
import { auth } from "@/Firebase/config";

//useDispatch hook with types.
export const useAppDispatch = () => useDispatch<AppDispatch>();
//useSelector hook with types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubcribed = auth.onAuthStateChanged((user) =>
      setUser(user as User)
    );
    return () => {
      unsubcribed();
    };
  }, []);

  return user;
};

