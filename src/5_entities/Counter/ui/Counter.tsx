import { Button, ButtonSize } from "6_shared/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { counterActions } from "../model/slice/counterSlice";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";

const Counter = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const value = useSelector(getCounterValue);
  const incriment = () => {
    dispatch(counterActions.increment());
  };
  const decriment = () => {
    dispatch(counterActions.decrement());
  };

  console.log(value);

  return (
    <div>
      <h1>
        {t("Value")}
        {" "}
        =
        {value}
      </h1>
      <Button onClick={incriment} square size={ButtonSize.L}>
        +
      </Button>
      <Button onClick={decriment} square size={ButtonSize.L}>
        -
      </Button>
    </div>
  );
};

export default Counter;
