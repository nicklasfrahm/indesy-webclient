import React from 'react'
import axios from 'axios'
import { Segment, Table, Header, Message } from 'semantic-ui-react'
import FullPageGrid from '../components/FullPageGrid'
import CreateRobot from '../components/CreateRobot'
import { ROBOT_ENDPOINT } from '../endpoints'

class RobotsPage extends React.Component {
  constructor() {
    super()
    this.state = { robots: [], loading: true, error: '' }
    this.timer = null
    this.readRobots = this.readRobots.bind(this)
    this.displayError = this.displayError.bind(this)
    this.hideError = this.hideError.bind(this)
  }

  displayError(err) {
    this.setState({ error: err.response.data.error })
  }

  hideError() {
    this.setState({ error: '' })
  }

  readRobots() {
    axios
      .get(ROBOT_ENDPOINT)
      .then(response =>
        this.setState({ robots: response.data, loading: false })
      )
      .catch(this.displayError)
  }

  componentWillMount() {
    this.timer = setInterval(() => this.readRobots(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

  render() {
    const { robots, loading, error } = this.state
    return (
      <FullPageGrid>
        {error && (
          <Message
            error
            onDismiss={this.hideError}
            content={error}
            error={!!error}
          />
        )}
        <Segment raised loading={loading}>
          <Header as="h1">Robots</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Map</Table.HeaderCell>
                <Table.HeaderCell>X Position</Table.HeaderCell>
                <Table.HeaderCell>Y Position</Table.HeaderCell>
                <Table.HeaderCell>Angle</Table.HeaderCell>
                <Table.HeaderCell>Token</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {robots.length && !loading ? (
                robots.map(robot => (
                  <Table.Row key={robot._id}>
                    <Table.Cell>{robot.name || 'not available'}</Table.Cell>
                    <Table.Cell>{robot.status || 'not available'}</Table.Cell>
                    <Table.Cell>{robot.map || 'not available'}</Table.Cell>
                    <Table.Cell>{robot.xPos}</Table.Cell>
                    <Table.Cell>{robot.yPos}</Table.Cell>
                    <Table.Cell>{robot.angle}</Table.Cell>
                    <Table.Cell>{robot.token}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell>No robots added yet!</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <CreateRobot
            updateHandler={this.readRobots}
            errorHandler={this.displayError}
          />
        </Segment>
      </FullPageGrid>
    )
  }
}

export default RobotsPage
