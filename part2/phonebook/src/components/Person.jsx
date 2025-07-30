
export const Person = ({ persons, removePerson }) => {
  return (
    <>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};
