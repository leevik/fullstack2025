export const Part = ({part, exercises, id}) => {
  return (
    <>
      <li key={id}>{part} {exercises}</li>
    </>
  )
}