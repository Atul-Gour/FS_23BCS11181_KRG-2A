import { useState } from "react";
import "./app.css";
function Counter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const increment = () => {
    if (count < 10) {
      setCount(count + 1);
      setMessage("");
    } else {
      setMessage("Maximum limit reached");
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setMessage("");
    }
  };

  const reset = () => {
    setCount(0);
    setMessage("");
  };

  return (
    <div className="card">
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}

export default Counter;