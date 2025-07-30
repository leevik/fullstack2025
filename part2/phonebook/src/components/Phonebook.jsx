import { Person } from "./Person";
export const Phonebook = ({ persons, removePerson}) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        <Person persons={persons} removePerson={removePerson}/>
      </div>
    </>
  );
};
