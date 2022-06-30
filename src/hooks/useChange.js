import { useState } from "react";

const useChange = (defaultValue) => {
  const [state, setState] = useState(defaultValue);

  const handleChange = (event) => {
    setState(event.target.value);
  };
  return {
    state,
    onChange: handleChange,
  };
};

export default useChange;