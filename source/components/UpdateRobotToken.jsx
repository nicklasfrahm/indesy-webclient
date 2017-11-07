import React from 'react'
import axios from 'axios'
import { Modal, Button } from 'semantic-ui-react'
import { ROBOT_ENDPOINT } from '../endpoints'

class UpdateRobotToken extends React.Component {
  constructor() {
    super()
    this.state = { isModalOpen: false }
    this.updateRobotToken = this.updateRobotToken.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  updateRobotToken() {
    this.closeModal()
    axios
      .patch(`${ROBOT_ENDPOINT}/${this.props.entity._id}`, {
        token: 'UPDATE_TOKEN'
      })
      .then(response => this.props.updateHandler())
      .catch(this.props.errorHandler)
  }

  render() {
    const { isModalOpen } = this.state
    return (
      <Modal
        open={isModalOpen}
        onClose={this.closeModal}
        trigger={
          <Button color="blue" icon="refresh" onClick={this.openModal} />
        }
      >
        <Modal.Header content="Are you sure?" />
        <Modal.Content>
          <p>
            If you refresh the security token, you are also required to
            physically connect to the robot and update the token locally. Be
            aware that, while the token on robot is not updated, it will be
            disconnected from the system. Also make sure you are able to gain
            physical access to the robot before performing this action.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.closeModal}>
            Cancel
          </Button>
          <Button color="red" onClick={this.updateRobotToken}>
            Refresh token
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default UpdateRobotToken
