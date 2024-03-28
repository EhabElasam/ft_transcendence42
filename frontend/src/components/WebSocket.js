class WebSocketInstance {
    constructor() {
      this.socket = null;
      this.callbacks = {};
    }
  
    connect() {
      this.socket = new WebSocket("ws://pong42.azurewebsites.net/ws/chat"); // Replace with your Django Channels WebSocket URL
  
      this.socket.onopen = () => {
        console.log("WebSocket connected");
      };
  
      this.socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        const { type, ...messageData } = data;
  
        if (this.callbacks[type]) {
          this.callbacks[type](messageData);
        }
      };
  
      this.socket.onclose = () => {
        console.log("WebSocket closed");
      };
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    }
  
    newChatMessage(message) {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: "chat_message", ...message }));
      } else {
        console.error("WebSocket not connected");
      }
    }
  
    // You can add more methods for handling different types of messages
  
    setCallback(type, callback) {
      this.callbacks[type] = callback;
    }
  
    removeCallback(type) {
      delete this.callbacks[type];
    }
  }
  
  const websocketInstance = new WebSocketInstance();
  export default websocketInstance;
  