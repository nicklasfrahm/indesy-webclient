import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { HashRouter, Switch, Route, Redirect, NavLink } from 'react-router-dom'
import GpsTest from './GpsTest'
import RobotsPage from './RobotsPage'
import ControlPanel from './ControlPanel'

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
              to="/control-panel"
              activeClassName="active"
            >
              Control Panel
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/robots" activeClassName="active">
              Robots
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item header>INDESY</Menu.Item>
      </Menu>
      <Switch>
        <Route exact path="/robots" component={RobotsPage} />
        <Route exact path="/gps-test" component={GpsTest} />
        <Route exact path="/control-panel" component={ControlPanel} />
        <Redirect to="/control-panel" />
      </Switch>
    </div>
  </HashRouter>
)

export default App
