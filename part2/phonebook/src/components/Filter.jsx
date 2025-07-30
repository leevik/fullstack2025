import { Phonebook } from "./Phonebook";

export const Filter = ({persons, filter, removePerson}) => {
    console.log(filter)
     const filteredList = persons.filter((person) =>
    person.name.toLowerCase().match(filter)
  );
  console.log("hoho",filteredList)
  return(
    <>
    <Phonebook persons={filteredList} removePerson={removePerson} />
    </>
  )

}