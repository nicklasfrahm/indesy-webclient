import React from 'react'
import axios from 'axios'
import { Modal, Form, Button } from 'semantic-ui-react'
import { ROBOT_ENDPOINT } from '../endpoints'

class UpdateRobot extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false, name: props.entity.name }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.updateRobotName = this.updateRobotName.bind(this)
    this.updateRobot = this.updateRobot.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  updateRobotName(event, data) {
    this.setState({ name: data.value, error: false })
  }

  updateRobot() {
    axios
      .patch(`${ROBOT_ENDPOINT}/${this.props.entity._id}`, {
        name: this.state.name.trim()
      })
      .then(response => this.props.updateHandler)
      .catch(this.props.errorHandler)
    this.setState({ isModalOpen: false })
  }

  render() {
    const { isModalOpen, name } = this.state
    return (
      <Modal
        open={isModalOpen}
        onClose={this.closeModal}
        trigger={
          <Button onClick={this.openModal} icon="pencil" color="orange" />
        }
      >
        <Modal.Header content="Edit robot" />
        <Modal.Content>
          <Form onSubmit={this.updateRobot}>
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
          <Button color="green" onClick={this.updateRobot}>
            Edit robot
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default UpdateRobot
