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

export default InfoMessage
