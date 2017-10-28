import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { HashRouter, Switch, Route, Redirect, NavLink } from 'react-router-dom'
import GpsTest from './GpsTest'
import WebSocketTest from './WebsocketTest'

const App = props => (
  <HashRouter>
    <div>
      <Menu inverted attached style={{ position: 'relative', zIndex: '100' }}>
        <Dropdown icon="align justify" className="icon" item>
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/gps-test" activeClassName="active">
              GPS Test
            </Dropdown.Item>
            <Dropdown.Item
              as={NavLink}
              to="/websocket-test"
              activeClassName="active"
            >
              Websocket Test
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item header>INDESY</Menu.Item>
      </Menu>
      <Switch>
        <Route exact path="/gps-test" component={GpsTest} />
        <Route exact path="/websocket-test" component={WebSocketTest} />
        <Redirect to="/websocket-test" />
      </Switch>
    </div>
  </HashRouter>
)

export default App
