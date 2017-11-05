import React from 'react'
import { Segment, Table, Header, Modal, Button } from 'semantic-ui-react'
import FullPageGrid from '../components/FullPageGrid'
import axios from 'axios'
import { ROBOT_ENDPOINT } from '../endpoints'

class RobotsPage extends React.Component {
  constructor() {
    super()
    this.state = { robots: [], loading: true, isModalOpen: false }
    this.timer = null
    this.readRobots = this.readRobots.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  readRobots() {
    axios
      .get(ROBOT_ENDPOINT)
      .then(response =>
        this.setState({ robots: response.data, loading: false })
      )
      .catch(console.log)
  }

  componentWillMount() {
    this.timer = setInterval(() => this.readRobots(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

  render() {
    const { robots, loading, isModalOpen } = this.state
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
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell>No robots added yet!</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <Modal
            open={isModalOpen}
            onClose={this.closeModal}
            trigger={
              <Button onClick={this.openModal} color="black">
                Add robot
              </Button>
            }
          >
            <Modal.Header content="Add robot" />
            <Modal.Content>
              <p>Soon you can add robots here!</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={this.closeModal}>
                Cancel
              </Button>
              <Button color="green" onClick={this.closeModal}>
                Add robot
              </Button>
            </Modal.Actions>
          </Modal>
        </Segment>
      </FullPageGrid>
    )
  }
}

export default RobotsPage
