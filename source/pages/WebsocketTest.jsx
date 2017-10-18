import React from 'react'
import {
  Segment,
  Header,
  Icon,
  Table,
  Label,
  Statistic
} from 'semantic-ui-react'
import { getSocket, connect, disconnect, testTimer } from '../socketio'

import FullPageGrid from '../components/FullPageGrid'

class WebSocketTest extends React.Component {
  constructor(props) {
    super()
    this.state = { connected: getSocket().connected, timestamp: null }
    connect(() =>
      this.setState(Object.assign({}, this.state, { connected: true }))
    )
    disconnect(() =>
      this.setState(Object.assign({}, this.state, { connected: true }))
    )
    testTimer(data =>
      this.setState(
        Object.assign({}, this.state, { timestamp: data.timestamp })
      )
    )
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
