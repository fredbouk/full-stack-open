import { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => (
  <p>{props.text}: {props.stat}</p>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = () => good + neutral + bad
  const average = () => (good - bad) / total()
  const positive = () => `${(good / total() * 100).toFixed(1)} %`

  if (total() === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <>
      <Statistic text='Good' stat={good} />
      <Statistic text='Neutral' stat={neutral} />
      <Statistic text='Bad' stat={bad} />

      <Statistic text='All' stat={total()} />
      <Statistic text='Average' stat={average()} />
      <Statistic text='Positive' stat={positive()} />
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text='Give feedback' />

      <Button handleClick={() => setGood(good + 1)} text='Good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='Bad' />

      <Header text='Statistics' />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
