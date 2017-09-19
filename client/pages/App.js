import React from 'react'
import { Menu } from 'semantic-ui-react'
import Home from './Home'

const App = props => {
  return (
    <div>
      <Menu inverted attached>
        <Menu.Item header>INDESY</Menu.Item>
        <Menu.Item link>Home</Menu.Item>
      </Menu>
      <Home />
    </div>
  )
}

export default App
