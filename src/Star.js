import React from 'react'
// import './star.css'

// props.onClick(value)

export const Star = (props) => {
  const [value, setValue] = React.useState(props.presetValue || 0)
  const [isLocked, setIsLocked] = React.useState(false)

  const stars = [1,2,3,4,5].map(starValue => {
    const mouseMove = () => {
      if (isLocked) {
        return
      }
      setValue(starValue)
    }

    const onClick = () => {
      setIsLocked(true)
      setValue(starValue)
      props.onClick && props.onClick(starValue)
    }

    let iconVal = 'far'
    if (starValue <= value) {
      iconVal = 'fas'
    }

    return (
      <i 
        className={`${iconVal} fa-star`}
        key={starValue}
        onMouseMove={mouseMove}
        onClick={onClick}></i>
    )
  })
  
  const divMouseEnter = () => {
    setIsLocked(false)
  }

  let message = `${value} star rating?`

  if (isLocked) {
    message = `${value} star selected`
  }

  return (
    <div onMouseEnter={divMouseEnter}>
      {stars} 
      <h1>{message}</h1>
    </div>
  )
}