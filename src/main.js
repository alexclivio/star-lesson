import React from 'react'
import ReactDOM from 'react-dom'
import {Star} from './Star';
import {Kanban} from './Kanban'
import {Search} from './Search'
import Pokemon from './Pokemon'

import './star.css'
import './Pokemon.css'

const App = () => {
  const pathName = window.location.pathname.split('/').pop()
  if(pathName.toLocaleLowerCase() === 'stars') {
    return (
      <Star/>
    )
  }

  const kanbanData = JSON.parse(window.localStorage.getItem('kanban') || '[]')

  if(pathName.toLocaleLowerCase() === 'kanban') {
    return (
      <Kanban data={kanbanData}/>
    )
  }
  
  if(pathName.toLocaleLowerCase() === 'search') {
    return (
      <Pokemon/>
    )
  }
}

ReactDOM.render( 
  <App/>,
  document.getElementById('root')
);