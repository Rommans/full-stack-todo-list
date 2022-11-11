import { useState, useCallback } from "react";
import Calculation from "./Calculation";
import TextInputWithFocusButton from "./UseRefExample";
import UseReducerExample from "./UseReducerExample";
import Todos from "./Todos";

const Counter = ({ doSomething }) => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback(() => {
    setTodos((val) => [...val, "New Todo"]);
  }, [doSomething]);

  return (
    <div>
      <div>Counter: {count}</div>
      <button onClick={() => setCount((val) => val + 1)}>Increase Count</button>
      {/*  useMemo react hook */}
      <Calculation count={count} />
      {/*  memo react */}
      <Todos todos={todos} addTodo={addTodo} />
      {/*  useRef react hook */}
      <TextInputWithFocusButton />
      {/*  useReducer react hook */}
      <UseReducerExample />
    </div>
  );
};

export default Counter;
