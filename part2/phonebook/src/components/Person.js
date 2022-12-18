const Person = ({ person, handleDeletePerson }) => {
  return (
    <p>
      {person.name} {person.number}
      &nbsp;
      <button onClick={() => handleDeletePerson(person)}>delete</button>
    </p>
  )
}

export default Person
