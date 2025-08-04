import { useState, useEffect } from "react";
import { Person } from "./components/Person";
import { Form } from "./components/Form";
import { Phonebook } from "./components/Phonebook";
import { Filter } from "./components/Filter";

import personService from "./services/numbers"

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("type");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
        console.log("data",response)
      })
  }, [])
  console.log("render", persons.length, "persons")

  const handleNameChange = (event) => {
    event.preventDefault();
    const nameObject = {
      name: event.target.value,
    };
    setNewName(nameObject.name);
  };
  const handleNumberChange = (event) => {
    event.preventDefault();
    const phoneNumber = {
      number: event.target.value,
    };
    setPhoneNumber(phoneNumber.number);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: phoneNumber,
    };
    if (persons.some((p) => p.name === newName)) {
      if(window.confirm("päivitetäänkö?")){
        const testi = persons.find(p => p.name === newName)
        console.log("testi: ", testi)
        personService
        .update(testi.id, personObject)
        .then(returnedPerson => {
          setPersons(returnedPerson)
        })
        console.log("personit: ", persons)
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          console.log(error)
        })
      setNewName("")
      setPhoneNumber("")
    }
  };
  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const removePerson = (id) => {
    console.log("removeperson id: ", id)
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}?`)){
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        }).catch(error => {
          console.log(error)
          alert(`Person ${person.name} poistossa virhe.`)
        })
    }
}
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with:
      <input type="text" value={filter} onChange={handleFilterChange} />
      <Form
        newName={newName}
        handleSubmit={handleSubmit}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        persons={persons}
        phoneNumber={phoneNumber}
      />
      <Filter persons={persons} filter={filter} removePerson={removePerson}/>
    </div>
  );
}

export default App;
