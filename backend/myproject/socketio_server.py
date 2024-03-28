import socketio
import asyncio

# Erstelle einen Socket.IO Server
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = socketio.ASGIApp(sio)

# Event-Handler für neue Verbindungen
@sio.event
async def connect(sid, environ):
    print('Client connected', sid)

# Event-Handler für getrennte Verbindungen
@sio.event
async def disconnect(sid):
    print('Client disconnected', sid)

# Event-Handler für Nachrichten
@sio.event
async def message(sid, data):
    print('Message received:', data)
    await sio.emit('reply', {'response': 'Message received!'}, room=sid)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8001)
