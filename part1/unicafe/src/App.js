import { useState } from 'react'

const H1 = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <p>{props.text} {props.count}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = `${good / all * 100} %`

  return (
    <div>
      <H1 text='Give feedback' />

      <Button text='good' onClick={increaseGood} />
      <Button text='neutral' onClick={increaseNeutral} />
      <Button text='bad' onClick={increaseBad} />

      <H1 text='Statistics' />

      <Statistic text='good' count={good} />
      <Statistic text='neutral' count={neutral} />
      <Statistic text='bad' count={bad} />
      <Statistic text='all' count={all} />
      <Statistic text='average' count={average} />
      <Statistic text='positive' count={positive} />
    </div>
  )
}

export default App
