import React from 'react'
// import './star.css'

const titleInfo = [
  {title: 'ToDo',color: '#35235D'},
  {title: 'Doing',color: '#CB2402'},
  {title: 'Done',color: '#4C49A2'},
  {title: 'Approved',color: '#A31A48'}
]

const Board = (props) => {
  const [todoValue, setTodoValue] = React.useState('')
  const [todos, setTodos] = React.useState(props.data)
  const boardId = props.boardId
  const {title, color} = titleInfo[boardId]

  const addTodo = () => {
    const newDataValues = [...todos, todoValue]
    setTodos(newDataValues)
    setTodoValue('')
    props.onDataChange(newDataValues)
  }

  const updateTextArea = (e) => {
    setTodoValue(e.target.value);
  }

  const todoComponent = todos.map( (todo, i) => {
    const deleteTodo = () => {
      const newDataValues = [...todos]
      newDataValues.splice(i, 1)
      setTodos(newDataValues)
      props.onDataChange(newDataValues)
    }
    const moveRight = () => {
      const newDataValues = [...todos]
      newDataValues.splice(i, 1)
      setTodos(newDataValues)
      props.onDataChange(newDataValues)
      props.moveRight(todo)
    }
    const moveLeft = () => {
      const newDataValues = [...todos]
      newDataValues.splice(i, 1)
      setTodos(newDataValues)
      props.onDataChange(newDataValues)
      props.moveLeft(todo)
    }
    let leftArrow = ''
    if(boardId > 0) {
      leftArrow = <div className="swap left clickable" onClick={moveLeft}>&lt;</div>
    }
    let rightArrow = <div className="swap right clickable" onClick={moveRight}>&gt;</div>
    if(boardId === 3) {
      rightArrow = ''
    }
    return (
      <div className='todoContainer' key={i}>
        {leftArrow}
        <div className="center clickable" onClick={deleteTodo}>{todo}</div>  
        {rightArrow}
      </div>
    )
  })

  return (
    <div className='todoListContainer'>
      <div className="title" style={{backgroundColor: `${color}`}}>{title}</div> 
      {todoComponent}
      <div className="inputContainer">
        <textarea onChange={updateTextArea} value={todoValue}></textarea>
        <button onClick={addTodo}>Submit</button>
      </div>
    </div>
  )
}

export const Kanban = (props) => {
  let initialBoardsData = [[],[],[],[]]
  if(props.data && props.data.length) {
    initialBoardsData = props.data
  }
  const [boardsData, setBoardsData] = React.useState(initialBoardsData)
  const boards = boardsData.map((boardInfo, i) => {
    const onDataChange = (newData) => {
      boardsData[i] = newData
      window.localStorage.setItem('kanban', JSON.stringify(boardsData))
    }
    const moveLeft = (value) => {
      boardsData[i-1].push(value)
      setBoardsData([...boardsData])
      window.localStorage.setItem('kanban', JSON.stringify(boardsData))
    }
    const moveRight = (value) => {
      boardsData[i+1].push(value)
      setBoardsData([...boardsData])
      window.localStorage.setItem('kanban', JSON.stringify(boardsData))
    }
    return <Board 
      data={boardInfo}
      key={i}
      boardId={i}
      onDataChange={onDataChange}
      moveLeft={moveLeft}
      moveRight={moveRight}
      />
  })
  return (
    <div className='kanban'>
      {boards}
    </div>
  )
}