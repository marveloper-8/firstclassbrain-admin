import React from 'react'

import Home from './pages/Home.js'
import Books from './pages/Books.js'
import Account from './pages/Account.js'

import {
  BrowserRouter as Router,
//   Switch,
  Route,
//   Link
} from "react-router-dom"

const createRoutes = () => (
    <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="about" component={Books} />
        <Route exact path="account" component={Account} />
    </Router>
)

export default createRoutes
