import React from 'react'
import {
  Segment,
  Header,
  Icon,
  Table,
  Label,
  Statistic
} from 'semantic-ui-react'
import socket from '../socketio'
import FullPageGrid from '../components/FullPageGrid'

class ControlPanel extends React.Component {
  constructor(props) {
    super()
    this.socket = socket
    this.state = { connected: this.socket.connected, buttons: [], duty: 0 }
    this.connectHandler = this.connectHandler.bind(this)
    this.disconnectHandler = this.disconnectHandler.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  connectHandler() {
    this.setState({ connected: true })
  }

  disconnectHandler() {
    this.setState({ connected: false })
  }

  testTimerHandler(data) {
    this.setState({ timestamp: data.timestamp })
  }

  handleKeyDown(event) {
    const { key } = event
    let nextState = Object.assign({}, this.state)
    if (key === 'ArrowLeft') {
      if (!~nextState.buttons.indexOf('L')) {
        nextState.buttons = [...nextState.buttons, 'L']
      }
    }
    if (key === 'ArrowRight') {
      if (!~nextState.buttons.indexOf('R')) {
        nextState.buttons = [...nextState.buttons, 'R']
      }
    }
    if (key === 'ArrowUp') {
      if (nextState.duty < 91) {
        nextState.duty += 10
      }
    }
    if (key === 'ArrowDown') {
      if (nextState.duty > -91) {
        nextState.duty -= 10
      }
    }
    this.setState(nextState)
    this.socket.emit('controlMovement', {
      buttons: nextState.buttons,
      duty: nextState.duty
    })
  }

  handleKeyUp(event) {
    const { key } = event
    let nextState = Object.assign({}, this.state)
    if (key === 'ArrowLeft') {
      if (~nextState.buttons.indexOf('L')) {
        nextState.buttons = [...nextState.buttons].filter(e => e !== 'L')
      }
    }
    if (key === 'ArrowRight') {
      if (~nextState.buttons.indexOf('R')) {
        nextState.buttons = [...nextState.buttons].filter(e => e !== 'R')
      }
    }
    this.setState(nextState)
    this.socket.emit('controlMovement', {
      buttons: nextState.buttons,
      duty: nextState.duty
    })
  }

  componentWillMount() {
    this.socket.on('connect', this.connectHandler)
    this.socket.on('disconnect', this.disconnectHandler)
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    this.socket.removeEventListener('connect', this.connectHandler)
    this.socket.removeEventListener('disconnect', this.disconnectHandler)
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  render() {
    const { connected, duty, buttons } = this.state
    return (
      <FullPageGrid>
        <Segment raised>
          <Header as="h1">Control Panel</Header>
          <Label color="black" size="large">
            <Icon name="feed" color={connected ? 'green' : 'red'} />
            Live updates are {!connected && 'not'} enabled!
          </Label>
          <pre>{duty}%</pre>
          <pre>{JSON.stringify(buttons)}</pre>
        </Segment>
      </FullPageGrid>
    )
  }
}

export default ControlPanel
