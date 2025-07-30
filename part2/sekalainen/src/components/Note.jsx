
const Note = ({ note, toggleImportance }) => {
  const label = note.important ?
  "make not impoartant" : "make important"
  return (
    <li>
      {note.content}
      <button className="hola" onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note