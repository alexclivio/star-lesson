import React from 'react';
import sendQuery from './sendQuery'

const PokeName = (props) => {
  return <h3>{props.pokeList}</h3>
}

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
    // console.log(e);
    sendQuery(`{search(str:"${e.target.value}"){name}}`).then(data => {
      // console.log(data.search);
      if(e.target.value !== '') {
        setPokemonList(data.search)
      }
      if(e.target.value === '') {
        // console.log("fwgwe");
        setPokemonList([])
      }
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

  // const clickSelection = (e) => {
  //   console.log("yes");
  //   console.log(e);
  //   sendQuery(`{getPokemon(str:"${e.target.textContext}"){name, image}}`).then(data => {
  //     setSelectedPokemon({
  //       name: data.getPokemon.name,
  //       image: data.getPokemon.image
  //     })
  //     setPokemonList([])
  //   })
  // }

  const pokemonFound = pokemonList.map((pokemon, i) => {
    return <PokeName pokeList={pokemon.name} key={i}/>
  })


  return (
    <div className="mainContainer">
      <div className="app">
        <h1 className="pokeMain">Pokemon Search</h1>
        <input className="pokeInput" type="text" onChange={handleSearchTerm} onKeyUp={loadSelection} />
      </div>
      <div className="searchResults-container">
        {pokemonFound}
      </div>
      {selectedPokemon.name && <PokemonSelected setLogin={props.setLogin} pokeInfo={selectedPokemon}/>}
    </div>
  )
}
