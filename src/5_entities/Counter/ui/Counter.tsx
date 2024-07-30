import { Button, ButtonSize } from "6_shared/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../model/slice/counterSlice";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";

const Counter = () => {
  const dispatch = useDispatch();
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
      <h1>Value = {value}</h1>
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
