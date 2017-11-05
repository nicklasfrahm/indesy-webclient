import io from 'socket.io-client'
import { API_URL } from './endpoints'

const socket = io(API_URL, { path: '/sio' })

console.log(`[SIO] API Server: ${API_URL}`)

export default socket
