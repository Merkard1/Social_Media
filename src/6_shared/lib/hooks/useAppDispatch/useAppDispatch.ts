import { AppDispatch } from "1_app/providers/StoreProvider";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
