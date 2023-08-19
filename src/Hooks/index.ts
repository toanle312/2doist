import { AppDispatch, RootState } from "../Redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

//useDispatch hook with types.
export const useAppDispatch = () => useDispatch<AppDispatch>();
//useSelector hook with types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;