import React from 'react'
import { Segment, Table, Header } from 'semantic-ui-react'
import FullPageGrid from '../components/FullPageGrid'
import axios from 'axios'
import { ROBOT_ENDPOINT } from '../endpoints'

class RobotsPage extends React.Component {
  constructor() {
    super()
    this.state = { robots: [], loading: true }
    this.timer = null
    this.loadRobots = this.loadRobots.bind(this)
  }

  loadRobots() {
    axios
      .get(ROBOT_ENDPOINT)
      .then(response =>
        this.setState({ robots: response.data, loading: false })
      )
      .catch(console.log)
  }

  componentWillMount() {
    this.timer = setInterval(() => this.loadRobots(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

  render() {
    const { robots, loading } = this.state
    return (
      <FullPageGrid>
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
              </Table.Row>
            </Table.Header>
            {robots.length && !loading ? (
              <Table.Body>
                {robots.map(robot => (
                  <Table.Row>
                    <Table.Cell>{robot.name || 'not available'}</Table.Cell>
                    <Table.Cell>{robot.status || 'not available'}</Table.Cell>
                    <Table.Cell>{robot.map || 'not available'}</Table.Cell>
                    <Table.Cell>{robot.xPos}</Table.Cell>
                    <Table.Cell>{robot.yPos}</Table.Cell>
                    <Table.Cell>{robot.angle}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            ) : (
              <Table.Cell>No robots added yet!</Table.Cell>
            )}
          </Table>
        </Segment>
      </FullPageGrid>
    )
  }
}

export default RobotsPage
