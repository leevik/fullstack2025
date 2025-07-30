import { useState } from "react";
import { Button } from "./Button";
import { Statistics } from "./Statistics";

function App() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
    setAverage(average+1);
    setPositive(positive+1)
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    setAverage(average-1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };

  return (
    <>
      <h2>Give feedback</h2>
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} positive={positive} average={average} total={total} />
      
      
    </>
  );
}

export default App;
