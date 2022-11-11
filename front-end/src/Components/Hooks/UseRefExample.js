import { useRef } from "react";

const TextInputWithFocusButton = () => {
  const inputEl = useRef(null);

  const onFocusInput = () => {
    inputEl.current.focus();
  };

  const onValueInput = () => {
    alert(inputEl.current.value);
  };

  return (
    <div>
      <input ref={inputEl} type="text" />
      <div>
        <button onClick={onFocusInput}>Focus the input</button>
      </div>
      <div>
        <button onClick={onValueInput}>Get Value</button>
      </div>
    </div>
  );
};

export default TextInputWithFocusButton;
