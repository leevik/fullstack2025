import { Part } from "./Part"
export const Content = ({parts, id}) => {
  return (
    <>
      {
        parts.map(part => {
          return <Part part={part.name} exercises={part.exercises} id={id} />
        })
      }
    </>
  )
}