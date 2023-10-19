import { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Buttons = ({ setGood, setNeutral, setBad, good, neutral, bad }) => {
  return (
    <>
      <Button handleClick={() => setGood(good + 1)} text='Good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='Bad' />
    </>
  )
}

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}:</td>
    <td>{props.stat}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = () => good + neutral + bad
  const average = () => ((good - bad) / total()).toFixed(1)
  const positive = () => `${(good / total() * 100).toFixed(1)} %`

  if (total() === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='Good' stat={good} />
        <StatisticLine text='Neutral' stat={neutral} />
        <StatisticLine text='Bad' stat={bad} />

        <StatisticLine text='All' stat={total()} />
        <StatisticLine text='Average' stat={average()} />
        <StatisticLine text='Positive' stat={positive()} />
      </tbody>
    </table>
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

      <Buttons setGood={setGood} setNeutral={setNeutral} setBad={setBad} good={good} neutral={neutral} bad={bad} />

      <Header text='Statistics' />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
