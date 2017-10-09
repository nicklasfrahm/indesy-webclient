import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { HashRouter, Switch, Route, Redirect, NavLink } from 'react-router-dom'
import Home from './Home'

const App = props => {
  return (
    <HashRouter>
      <div>
        <Menu inverted attached style={{ position: 'relative', zIndex: '100' }}>
          <Dropdown icon="align justify" className="icon" item>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/home" activeClassName="active">
                GPS Test
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/positions"
                activeClassName="active"
              >
                Positions
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/positions"
                activeClassName="active"
              >
                Paths
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item header>INDESY</Menu.Item>
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
