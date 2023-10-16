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
  <p>{props.text}: {props.clicks}</p>
)

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

      <Statistic text='Good' clicks={good} />
      <Statistic text='Neutral' clicks={neutral} />
      <Statistic text='Bad' clicks={bad} />
    </>
  )
}

export default App
