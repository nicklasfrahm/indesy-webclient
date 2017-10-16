import React from 'react'
import { Segment, Header, Icon, Table } from 'semantic-ui-react'
import { connect, disconnect } from '../socketio'

import FullPageGrid from '../components/FullPageGrid'

class WebSocketTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = { connected: false }
    connect(() => this.setState({ connected: true }))
    disconnect(() => this.setState({ connected: false }))
  }

  render() {
    return (
      <FullPageGrid>
        <Segment raised>
          <Header as="h3">
            <Icon
              name="exchange"
              color={this.state.connected ? 'green' : 'red'}
            />
            <Header.Content>Websocket Test</Header.Content>
          </Header>
          <p>Live updates are {!this.state.connected && 'not '}enabled!</p>
        </Segment>
      </FullPageGrid>
    )
  }
}

export default WebSocketTest
