import io from 'socket.io-client'

const socket = io('https://indesy.atombyte.de/', {
  path: '/ws'
})

export function connect(cb) {
  socket.on('connect', cb)
}

export function disconnect(cb) {
  socket.on('disconnect', cb)
}

export function testTimer(cb) {
  socket.on('testTimer', cb)
}
