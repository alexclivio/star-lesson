import React from 'react';
import { Search } from './Search'
import UserHome from './UserHome'
import sendQuery from './sendQuery'

const Pokemon = () => {
  const [login, setLogin] = React.useState({loading: true})
  React.useEffect(() => {
    sendQuery(`{user{name, image, lessons{title, value}}}`).then(data => {
      // console.log(data);
      setLogin({...data.user, loading: false})
    })
  }, [])

  if(login.loading) {
    return <h1>Loading...</h1>
  }

  if(login.name) {
    return (
      <>
        <UserHome login={login}/> 
      </>
    )
  }

  return (
    <>
      <Search setLogin={setLogin}/>
    </>
  )
}

export default Pokemon