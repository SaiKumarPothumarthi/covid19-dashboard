import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import StateIndividual from './components/StateIndividual'
import NotFound from './components/NotFound'
import Vaccination from './components/Vaccination'
import About from './components/About'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:stateCode" component={StateIndividual} />
    <Route exact path="/vaccination" component={Vaccination} />
    <Route exact path="/about" component={About} />
    <Route component={NotFound} />
  </Switch>
)

export default App
