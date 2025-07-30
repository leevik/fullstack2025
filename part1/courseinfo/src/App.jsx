import { useState } from "react";
import { Buttons } from "./Buttons";
import { History } from "./History";
import { Course } from "./Course";

import { Part } from "./Part";

import { Hello } from "./Hello";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [right, setRight] = useState(0);
  const [clicks, setClicks] = useState({ left: 0, right: 0 });
  const [allClicks, setAll] = useState([]);
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  });
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const randomNumber = () => Math.random() * anecdotes.length;
  const handleClick = () => {
    setCounter(counter + 1);
    setSelected(~~randomNumber());
  };
  const handleLeftClick = () => {
    setClicks({ ...clicks, left: clicks.left + 1 });
    setAll(allClicks.concat("L"));
  };
  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1,
    };
    setClicks(newClicks);
    setAll(allClicks.concat("R"));
  };
  const vote = () => {
    console.log("selected: ", selected);
    const value = selected + 1;
    console.log(value);
    setVote({ ...votes, [value]: votes[value] + 1 });
  };

  const setToZero = () => setCounter(0);
  const setBothToZero = () => {
    const newClicks = {
      left: 0,
      right: 0,
    };
    setClicks(newClicks);
  };

  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
        },
        {
          name: "State of a component",
          exercises: 14,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  const maxVotes = Math.max(...Object.values(votes));
  const maxKey = parseInt(
    Object.keys(votes).find((key) => votes[key] === maxVotes)
  );
  const topAnecdote = anecdotes[maxKey - 1];
  console.log("maxVotes", maxVotes);
  console.log("maxKey", maxKey);
  console.log("topAnecdote", topAnecdote);
  console.log("anecdotes", anecdotes[selected]);
  console.log("votes: ", votes);

  return (
    <div>
      <Course courses={courses} />
      <div>
        <Buttons onClick={handleClick} text="plus" />
        <Buttons onClick={setToZero} text="zero" />
        <Buttons onClick={() => setRight(right + 1)} text="right" />
        <Buttons onClick={setBothToZero} text="BothZero" />
        <Buttons onClick={handleLeftClick} text="left" />
        <Buttons onClick={handleRightClick} text="right" />

        {/* <button onClick={() => setCounter(counter+1)}>
        plus
        </button> 
        */}
        <br />
        {counter}
        <br />
        {right}
        <br />
        {clicks.left}
        {clicks.right}
        <p>{allClicks.join(" ")}</p>
        <History allClicks={allClicks} />
        <button onClick={vote}>Vote</button>
        <button onClick={handleClick}>Change Anecdote</button>
        <br />
        {anecdotes[selected]}
        <p>Most voted anecdote</p>
        <h2>
          <em>{topAnecdote}</em>
        </h2>
      </div>
    </div>
  );
};

export default App;
