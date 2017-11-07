import React from 'react'
import axios from 'axios'
import { Segment, Table, Header, Message, Button } from 'semantic-ui-react'
import FullPageGrid from '../components/FullPageGrid'
import CreateRobot from '../components/CreateRobot'
import UpdateRobot from '../components/UpdateRobot'
import UpdateRobotToken from '../components/UpdateRobotToken'
import { ROBOT_ENDPOINT } from '../endpoints'

class RobotsPage extends React.Component {
  constructor() {
    super()
    this.state = { robots: [], loading: true, error: '', visibleTokens: [] }
    this.refreshInterval = null
    this.errorTimeout = null
    this.readRobots = this.readRobots.bind(this)
    this.deleteRobot = this.deleteRobot.bind(this)
    this.displayError = this.displayError.bind(this)
    this.hideError = this.hideError.bind(this)
    this.hideRobotTokens = this.hideRobotTokens.bind(this)
    this.toggleTokenVisibility = this.toggleTokenVisibility.bind(this)
  }

  hideError() {
    this.setState({ error: '' })
  }

  displayError(err) {
    const error =
      (err.response && err.response.data.error) || 'An unknown error occured.'
    this.setState({ error })
    this.errorTimeout = setTimeout(() => this.hideError(), 10000)
  }

  readRobots() {
    axios
      .get(ROBOT_ENDPOINT)
      .then(response =>
        this.setState({ robots: response.data, loading: false })
      )
      .catch(this.displayError)
  }

  deleteRobot(id) {
    axios
      .delete(`${ROBOT_ENDPOINT}/${id}`)
      .then(response => this.readRobots())
      .catch(this.displayError)
  }

  hideRobotTokens(id, token) {
    if (!~this.state.visibleTokens.indexOf(id)) {
      return token.replace(/[a-f0-9]/g, 'x')
    } else {
      return token
    }
  }

  toggleTokenVisibility(id) {
    const index = this.state.visibleTokens.indexOf(id)
    if (!~index) {
      this.setState({ visibleTokens: [...this.state.visibleTokens, id] })
    } else {
      this.setState({
        visibleTokens: this.state.visibleTokens.filter(
          visibleToken => visibleToken !== id
        )
      })
    }
  }

  componentWillMount() {
    this.refreshInterval = setInterval(() => this.readRobots(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval)
    clearTimeout(this.errorTimeout)
    this.refreshInterval = null
    this.errorTimeout = null
  }

  render() {
    const { robots, loading, error, visibleTokens } = this.state
    const toggleTokenVisibilityIcon = id =>
      !~visibleTokens.indexOf(id) ? 'unhide' : 'hide'
    return (
      <FullPageGrid>
        {error && (
          <Message onDismiss={this.hideError} content={error} error={!!error} />
        )}
        <Segment raised loading={loading}>
          <Header as="h1">Robots</Header>
          <CreateRobot
            updateHandler={this.readRobots}
            errorHandler={this.displayError}
          />
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
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {robots.length && !loading ? (
                robots.map(robot => (
                  <Table.Row key={robot._id}>
                    <Table.Cell>{robot.name || 'not available'}</Table.Cell>
                    <Table.Cell>{robot.status || 'not available'}</Table.Cell>
                    <Table.Cell>{robot.map || 'not available'}</Table.Cell>
                    <Table.Cell collapsing>{robot.xPos}</Table.Cell>
                    <Table.Cell collapsing>{robot.yPos}</Table.Cell>
                    <Table.Cell collapsing>{robot.angle}</Table.Cell>
                    <Table.Cell>
                      <b>
                        <pre>
                          {this.hideRobotTokens(robot._id, robot.token)}
                        </pre>
                      </b>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Button
                        color="blue"
                        icon={toggleTokenVisibilityIcon(robot._id)}
                        onClick={() => this.toggleTokenVisibility(robot._id)}
                      />
                      <UpdateRobotToken
                        entity={robot}
                        updateHandler={this.readRobots}
                        errorHandler={this.displayError}
                      />
                      <UpdateRobot
                        entity={robot}
                        updateHandler={this.readRobots}
                        errorHandler={this.displayError}
                      />
                      <Button
                        color="red"
                        icon="trash"
                        onClick={() => this.deleteRobot(robot._id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell>
                    <b>No robots added yet!</b>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Segment>
      </FullPageGrid>
    )
  }
}

export default RobotsPage
