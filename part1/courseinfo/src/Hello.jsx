export const Hello = ({name, age}) => {
  const bornYear = () =>  new Date().getFullYear() - age
  return (
    <>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </>
  )
}