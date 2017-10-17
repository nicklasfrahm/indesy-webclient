import React from 'react'
import { Segment, Header, Icon, Table, Label } from 'semantic-ui-react'
import { getSocket, connect, disconnect } from '../socketio'

import FullPageGrid from '../components/FullPageGrid'

class WebSocketTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = { connected: getSocket().connected }
    connect(() => this.setState({ connected: true }))
    disconnect(() => this.setState({ connected: false }))
  }

  render() {
    return (
      <FullPageGrid>
        <Segment raised>
          <Header as="h3">
            <Icon name="exchange" />
            <Header.Content>Websocket Test</Header.Content>
          </Header>
          <Label color="black">
            <Icon
              name="signal"
              color={this.state.connected ? 'green' : 'red'}
            />
            Live updates are {!this.state.connected && 'not '}enabled!
          </Label>
        </Segment>
      </FullPageGrid>
    )
  }
}

export default WebSocketTest
