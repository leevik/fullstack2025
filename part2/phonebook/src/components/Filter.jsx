import { Phonebook } from "./Phonebook";

export const Filter = ({persons, filter, removePerson}) => {
    console.log("Filter value:", filter)
     const filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  console.log("Filtered list:", filteredList)
  return(
    <>
    <Phonebook persons={filteredList} removePerson={removePerson} />
    </>
  )

}