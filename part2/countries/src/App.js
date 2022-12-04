import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <b>Find countries:</b> <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState('')
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${apiKey}&units=metric`)
      .then(response => {
        setWeatherData(response.data)
      })
  }, [])

  if (weatherData) {
    return (
      <div>
        <p>Temperature: {weatherData.main.temp}° Celsius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={`${weatherData.weather[0].description}`}
        />
        <p>Wind: {weatherData.wind.speed} m/s</p>
      </div>
    )
  }

  return <p>Fetching weather data...</p>
}

const Country = ({ languages, name, capital, area, imgUrl }) => {
  const languagesArr = Object.values(languages)
  return (
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h3>Languages:</h3>
      <ul>
        {languagesArr.map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img
        src={imgUrl}
        alt={`${name} flag`}
      />
      <h2>Weather in {capital}</h2>
      <Weather capital={capital} />
    </div>
  )
}

const Info = ({ filteredCountries, handleClick }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map(country =>
          <p key={country.ccn3}>
            {country.name.common} <button onClick={() => handleClick(country.name.common)}>show</button>
          </p>
        )}
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <Country
        languages={filteredCountries[0].languages}
        name={filteredCountries[0].name.common}
        capital={filteredCountries[0].capital[0]}
        area={filteredCountries[0].area}
        imgUrl={filteredCountries[0].flags.png}
      />
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

  const handleClick = (countryName) => {
    setFilter(countryName)
  }

  const filteredCountries = filter
    ? countries.filter(country => {
      const regexPattern = new RegExp(filter, 'i')
      return regexPattern.test(country.name.common)
    })
    : []

  return (
    <>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <Info
        filteredCountries={filteredCountries}
        handleClick={handleClick}
      />
    </>
  )
}

export default App
