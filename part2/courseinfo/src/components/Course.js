const Header = ({ name }) => 
  <h2>{name}</h2>

const Part = ({ name, exercises }) =>
  <p>
    {name} {exercises}
  </p>

const Content = (props) => {
  return (
    <>
      {props.course.parts.map(course =>
        <Part key={course.id} name={course.name} exercises={course.exercises} />
      )}
    </>
  )
}

const Total = (props) => {
  const total = props.course.parts.reduce((previousValue, part) => previousValue + part.exercises, 0)
  return <b>total of {total} exercises</b>
}

const Course = (props) => {
  return (
    <>
      <Header name={props.course.name} />
      <Content course={props.course} />
      <Total course={props.course} />
    </>
  )
}

export default Course