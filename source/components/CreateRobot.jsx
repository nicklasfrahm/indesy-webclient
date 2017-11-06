import React from 'react'
import axios from 'axios'
import { Modal, Form, Button } from 'semantic-ui-react'
import { ROBOT_ENDPOINT } from '../endpoints'

class CreateRobot extends React.Component {
  constructor() {
    super()
    this.state = { isModalOpen: false, name: '' }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.updateRobotName = this.updateRobotName.bind(this)
    this.createRobot = this.createRobot.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  updateRobotName(event, data) {
    this.setState({ name: data.value.trim(), error: false })
  }

  createRobot() {
    axios
      .post(ROBOT_ENDPOINT, {
        name: this.state.name
      })
      .then(response => this.props.updateHandler)
      .catch(this.props.errorHandler)
    this.setState({ name: '', isModalOpen: false })
  }

  render() {
    const { isModalOpen, name } = this.state
    return (
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
          <Form onSubmit={this.createRobot}>
            <Form.Input
              onChange={this.updateRobotName}
              placeholder="Robot name"
              value={name}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.closeModal}>
            Cancel
          </Button>
          <Button color="green" onClick={this.createRobot}>
            Add robot
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default CreateRobot
