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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </>
  )
}

export default App