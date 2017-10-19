import io from 'socket.io-client'

const apiUrl = process.env.API_URL
const socket = io(apiUrl, { path: '/sio' })

console.log('[SIO] API Server: %s', apiUrl)

export default socket
