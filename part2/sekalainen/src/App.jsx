import { useEffect, useState } from "react";

import Note from "./components/Note";
import axios from "axios";
import noteService from "./services/notes";

/* const promise = axios.get("http://localhost:3001/notes");
promise.then((response) => {
  console.log(response);
}); 
*/
/* axios
    .get('http://localhost:3001/notes')
    .then(response=> {
      const promise = response.data
      console.log(promise)
    }) 
*/

/* 
const promise2 = axios.get("http://localhost:3001/foobar");
console.log(promise2); 
*/

function App() {
  /*   const [count, setCount] = useState(0); */
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(hola => {
        setNotes(notes.map((note) => (note.id === id ? hola : note)));
      }).catch(error => {
        console.log(error)
        alert(`note ${note.content} oli jo poistettu`)
      })
      setNotes(notes.filter(n => n.id !== id))
  };

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
      });
    noteService
      .getAllFake()
      .then((response => {
        setNotes(response);
      }))
  }, []);
  console.log("render", notes.length, "notes");

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const textToShow = showAll ? "Show only important notes" : "Show all notes";

  const handleButton = (event) => {
    setShowAll(!showAll);
  };

  /* const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }
    console.log("button clicked", event.target);
    setNotes(notes.concat(noteObject))
    setNewNote("")
  }; */
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService
      .create(noteObject)
      .then(asd => {
        setNotes(notes.concat(asd));
        setNewNote("");
      });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <>
      <div>
        <h1>Notes</h1>
        <button className="hola" onClick={handleButton}>{textToShow}</button>
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
        <form onSubmit={addNote}>
          <input
            type="text"
            name="hoplaa"
            value={newNote}
            onChange={handleNoteChange}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default App;
