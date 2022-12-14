import { useState, useEffect } from 'react'
import personService from './services/persons'
import InfoMessage from './components/InfoMessage'
import ErrorMessage from './components/ErrorMessage'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [infoMessage, setInfoMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
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
            }, 4000)
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
        }, 4000)
      })
  }

  const handleDeletePerson = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name} ?`)) {
      personService
        .remove(personToRemove.id)
        .then(setPersons(persons.filter(person => person.id !== personToRemove.id)))
        .catch(error => {
          console.log(error)
          setErrorMessage(
            `${personToRemove.name} has already been deleted from server`
          )
          setTimeout(() => {
            setErrorMessage('')
          }, 4000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <InfoMessage message={infoMessage} />
      <ErrorMessage message={errorMessage} />
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
