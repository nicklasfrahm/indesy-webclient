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

class WebSocketTest extends React.Component {
  constructor(props) {
    super()
    this.socket = socket
    this.state = { connected: this.socket.connected, timestamp: null }
    this.connectHandler = this.connectHandler.bind(this)
    this.disconnectHandler = this.disconnectHandler.bind(this)
    this.testTimerHandler = this.testTimerHandler.bind(this)
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

  componentWillMount() {
    this.socket.on('connect', this.connectHandler)
    this.socket.on('disconnect', this.disconnectHandler)
    this.socket.on('testTimer', this.testTimerHandler)
  }

  componentWillUnmount() {
    this.socket.removeEventListener('connect', this.connectHandler)
    this.socket.removeEventListener('disconnect', this.disconnectHandler)
    this.socket.removeEventListener('testTimer', this.testTimerHandler)
  }

  render() {
    const connected = this.state.connected
    const timestamp = this.state.timestamp
    const delay = timestamp ? Date.now() - timestamp : 0
    return (
      <FullPageGrid>
        <Segment raised>
          <Header as="h1">Websocket Test</Header>
          <Label color="black" size="large">
            <Icon name="feed" color={connected ? 'green' : 'red'} />
            Live updates are {!connected && 'not'} enabled!
          </Label>
          <br />
          <Statistic>
            <Statistic.Value>
              {timestamp ? new Date(timestamp).toLocaleTimeString() : 'SYNCING'}
            </Statistic.Value>
            <Statistic.Label>
              Server time ({timestamp ? `${delay}ms offset` : 'synchronizing'})
            </Statistic.Label>
          </Statistic>
        </Segment>
      </FullPageGrid>
    )
  }
}

export default WebSocketTest
