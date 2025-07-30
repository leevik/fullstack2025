import { StatisticLine } from "./StatisticLine";

export const Statistics = ({
  good,
  neutral,
  bad,
  total,
  average,
  positive,
}) => {
  if (total == 0) {
    return (
      <>
        <p>
          <em>No feedback given</em>
        </p>
      </>
    );
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
            <StatisticLine value={good} text={"Good: "} />
          </tr>
          <tr>
            <StatisticLine value={neutral} text={"Neutral: "} />
          </tr>
          <tr>
            <StatisticLine value={bad} text={"Bad: "} />
          </tr>
          <tr>
            <StatisticLine value={total} text={"Total: "} />
          </tr>
          <tr>
            <StatisticLine value={average / total} text={"Average: "} />
          </tr>
          <tr>
            <StatisticLine
              value={(positive / total) * 100}
              text={"Positive: "}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
};
