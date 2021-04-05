import React from 'react';
import sendQuery from './sendQuery'

// const PokeName = (props) => {
//   return <h3 style={{cursor: "pointer"}} onClick={props.clickSelection}>{props.pokeList}</h3>
// }

const PokemonSelected = (props) => {
  const login = (pokemonName) => {
    sendQuery(`mutation {login(pokemon: "${pokemonName}"){name, image, lessons{title}}}`).then(data => {
      props.setLogin(data.login)
    })
  }

  return (
    <div className="pokeInfo">
      <h2>{props.pokeInfo.name}</h2>
      <img src={props.pokeInfo.image} alt=""/>
      <button className="loginBtn" onClick={()=>login(props.pokeInfo.name)}>Login</button>
    </div>
  )
}

export const Search = (props) => {
  const [pokemonList, setPokemonList] = React.useState([])
  const [selectedPokemon, setSelectedPokemon] = React.useState({})

  const handleSearchTerm = (e) => {
    sendQuery(`{search(str:"${e.target.value}"){name}}`).then(data => {
      setPokemonList(e.target.value ? data.search : [])
      setSelectedPokemon({})
    })
  }

  const loadSelection = (e) => {
    // console.log(e.target.value);
    if(e.key === 'Enter') {
      sendQuery(`{getPokemon(str:"${e.target.value}"){name, image}}`).then(data => {
        setSelectedPokemon({
          name: data.getPokemon.name,
          image: data.getPokemon.image
        })
        setPokemonList([])
      })
    }
   }

  const handleClickSelection = (e) => {
    console.log(e.target.textContent);
    sendQuery(`{getPokemon(str:"${e.target.textContent}"){name, image}}`).then(data => {
      setSelectedPokemon({
        name: data.getPokemon.name,
        image: data.getPokemon.image
      })
      setPokemonList([])
    })
  }

  const pokemonFound = pokemonList.map((pokemon, i) => {
    return <h3 style={{cursor: "pointer"}} onClick={handleClickSelection} key={i}>{pokemon.name}</h3>
  })


  return (
    <div className="mainContainer">
      <div className="app">
        <h1 className="pokeMain">Pokemon Search</h1>
        <input className="pokeInput" type="text" onChange={handleSearchTerm} onKeyUp={loadSelection}/>
      </div>
      <div className="searchResults-container">
        {pokemonFound}
      </div>
      {selectedPokemon.name && <PokemonSelected setLogin={props.setLogin} pokeInfo={selectedPokemon}/>}
    </div>
  )
}
