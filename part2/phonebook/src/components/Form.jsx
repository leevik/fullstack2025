export const Form = ({
  handleSubmit,
  newName,
  handleNameChange,
  phoneNumber,
  handleNumberChange,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input type="text" value={newName} onChange={handleNameChange} />{" "}
          <br />
          number:
          <input
            type="text"
            value={phoneNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
    </>
  );
};
