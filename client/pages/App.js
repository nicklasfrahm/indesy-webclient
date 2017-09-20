import React from 'react'
import { Menu } from 'semantic-ui-react'
import { HashRouter, Switch, Route, Redirect, NavLink } from 'react-router-dom'
import Home from './Home'

const App = props => {
  return (
    <HashRouter>
      <div>
        <Menu inverted attached style={{ position: 'relative', zIndex: '100' }}>
          <Menu.Item header>INDESY</Menu.Item>
          <Menu.Item as={NavLink} activeClassName="active" to="/home">
            Home
          </Menu.Item>
        </Menu>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Redirect from="*" to="/home" />
        </Switch>
      </div>
    </HashRouter>
  )
}

export default App
