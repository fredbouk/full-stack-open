import Person from './Person'

const Persons = ({ personsToShow, handleDeletePerson }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson} />
      )}
    </div>
  )
}

export default Persons
