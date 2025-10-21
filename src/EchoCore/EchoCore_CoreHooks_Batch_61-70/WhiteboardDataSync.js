// WhiteboardDataSync.js
/**
 * Utility to sync whiteboard state across sessions via API or WebSocket.
 */
export default class WhiteboardDataSync {
  constructor(socketUrl) {
    this.socket = new WebSocket(socketUrl);
  }

  sendState(state) {
    this.socket.send(JSON.stringify({ type: 'WHITEBOARD_SYNC', data: state }));
  }

  onUpdate(callback) {
    this.socket.onmessage = (event) => callback(JSON.parse(event.data));
  }

  close() {
    this.socket.close();
  }
}
