export const StatisticLine = ({ value, text }) => {
  if (text == "Positive: ") {
    return (
      <td>
        {text}
        {value} %
      </td>
    );
  }
  return (
    <td>
      {text}
      {value}
    </td>
  );
};
