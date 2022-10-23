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

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const positive = `${props.good / all * 100} %`

  if (all !== 0) {
    return (
      <>
        <Statistic text='good' count={props.good} />
        <Statistic text='neutral' count={props.neutral} />
        <Statistic text='bad' count={props.bad} />
        <Statistic text='all' count={all} />
        <Statistic text='average' count={average} />
        <Statistic text='positive' count={positive} />
      </>
    )
  }
  return (
    <p>No feedback given</p>
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
    <div>
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

    </div>
  )
}

export default App
