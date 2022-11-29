import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      Find countries: <input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  )
}

const Country = (props) => {
  return (
    <>
      <p>{props.name}</p>
      <button onClick={() => props.handleClick(props.name)}>show</button>
    </>
  )
}

const Countries = (props) => {
  if (props.filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (props.filteredCountries.length <= 10 && props.filteredCountries.length > 1) {
    return (
      <div>
        {props.filteredCountries.map(country =>
          <Country
            key={country.ccn3}
            name={country.name.common}
            handleClick={props.handleClick}
          />
        )}
      </div>
    )
  } else if (props.filteredCountries.length === 1) {
    const languagesArr = Object.values(props.filteredCountries[0].languages)
    return (
      <div>
        <h1>{props.filteredCountries[0].name.common}</h1>
        <p>Capital: {props.filteredCountries[0].capital[0]}</p>
        <p>Area: {props.filteredCountries[0].area}</p>
        <h2>Languages:</h2>
        <ul>
          {languagesArr.map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
        <img
          src={props.filteredCountries[0].flags.png}
          alt={`${props.filteredCountries[0].name.common} flag`}
        />
      </div>
    )
  }
}

function App () {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleClick = (country) => {
    setFilter(country)
  }

  const filteredCountries = countries.filter(country => {
    const regexPattern = new RegExp(filter, 'i')
    return regexPattern.test(country.name.common)
  })

  return (
    <>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        filteredCountries={filteredCountries}
        handleClick={handleClick}
      />
    </>
  )
}

export default App
