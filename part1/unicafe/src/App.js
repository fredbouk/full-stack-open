import { useState } from 'react'

const H1 = ({ text }) => <h1>{text}</h1>

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  const average = ((good - bad) / all)
  const positive = `${good / all * 100} %`
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <>
      <H1 text='Give feedback' />

      <Button text='good' onClick={increaseGood} />
      <Button text='neutral' onClick={increaseNeutral} />
      <Button text='bad' onClick={increaseBad} />

      <H1 text='Statistics' />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />

    </>
  )
}

export default App
