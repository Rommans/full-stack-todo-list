import { useEffect, useState, useMemo } from "react";

const Calculation = ({ count }) => {
  const [calculation, setCalculation] = useState(0);
  const [localCounter, setLocalCounter] = useState(0);

  useEffect(() => {
    setCalculation(count * 2);
  }, [count]);

  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {
      num += 1;
    }
    return num;
  };

  const expensiveCalculationResult = useMemo(
    () => expensiveCalculation(count),
    [count]
  );

  return (
    <div>
      <p>Calculation: {calculation}</p>
      <p>Expensive Calculation: {expensiveCalculationResult}</p>
      <div>
        <p>Local Counter: {localCounter}</p>
        <button onClick={() => setLocalCounter((val) => val + 1)}>
          Increase local counter
        </button>
      </div>
    </div>
  );
};

export default Calculation;
