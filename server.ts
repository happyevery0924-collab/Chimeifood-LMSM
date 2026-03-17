import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

async function startServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });
  const PORT = 3000;

  // In-memory state
  let serverState = {
    courses: null,
    registrations: null,
  };

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send current state to newly connected client if it exists
    if (serverState.courses !== null) {
      socket.emit('init_state', serverState);
    } else {
      socket.emit('request_initial_state');
    }

    // Listen for state updates from clients
    socket.on('update_state', (newState) => {
      serverState = { ...serverState, ...newState };
      // Broadcast the new state to all OTHER clients
      socket.broadcast.emit('state_updated', serverState);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
