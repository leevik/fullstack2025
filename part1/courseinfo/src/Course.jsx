import { Content } from "./Content";
import { Total } from "./Total";
import { Header } from "./Header";
export const Course = ({ courses }) => {
  console.log(courses);
  return (
    <div>
      {courses.map((course) => (
        <>
          <ul>
            <Header name={course.name} />
            <Content parts={course.parts} id={course.id}/>
            <Total parts={course.parts} />
          </ul>
          {console.log("kurssi: ", course)}
        </>
      ))}
    </div>
  );
};
