import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const InfoMessage = ({ message }) => {
  const infoMessageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === '') {
    return
  }

  return (
    <div style={infoMessageStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [infoMessage, setInfoMessage] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = showAll
    ? persons
    : persons.filter(person => {
      const regexPattern = new RegExp(filter, 'i')
      return regexPattern.test(person.name)
    })

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowAll(false)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    // update exisiting persons number
    if (persons.some(person => person.name.toUpperCase() === newName.toUpperCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())
        const idOfPersonToUpdate = personToUpdate.id
        const editedPersonToUpdate = { ...personToUpdate, number: newNumber }
        personService.update(idOfPersonToUpdate, editedPersonToUpdate)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== idOfPersonToUpdate ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            setInfoMessage(
              `Successfully updated ${updatedPerson.name}'s number`
            )
            setTimeout(() => {
              setInfoMessage('')
            }, 5000)
          })
        return
      } else {
        return
      }
    }

    // add new person
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setInfoMessage(
          `Successfully added ${returnedPerson.name} to phonebook`
        )
        setTimeout(() => {
          setInfoMessage('')
        }, 5000)
      })
  }

  const handleDeletePerson = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name} ?`)) {
      personService
        .remove(personToRemove.id)
        .then(setPersons(persons.filter(person => person.id !== personToRemove.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <InfoMessage message={infoMessage} />
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleAddPerson={handleAddPerson}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App
