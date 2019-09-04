import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Genres from './components/genres/Genres'
import NewGenre from './components/genres/NewGenre'
import UpdateGenre from './components/genres/UpdateGenre'
import TvSeries from './components/tvSeries/TvSeries'
import NewTvSerie from './components/tvSeries/NewTvSerie'
import TvSerieInfo from './components/tvSeries/TvSerieInfo'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/generos' component={Genres} />
        <Route exact path='/generos/novo' component={NewGenre} />
        <Route exact path='/generos/editar/:id' component={UpdateGenre} />
        <Route exact path='/series' component={TvSeries} />
        <Route exact path='/series/nova' component={NewTvSerie} />
        <Route exact path='/series/info/:id' component={TvSerieInfo} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
