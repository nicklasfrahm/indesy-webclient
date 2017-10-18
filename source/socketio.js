import io from 'socket.io-client'

const socket = io('https://indesy.atombyte.de/', {
  path: '/ws'
})

export default socket
