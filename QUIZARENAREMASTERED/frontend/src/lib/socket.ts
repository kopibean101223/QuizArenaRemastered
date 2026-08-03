import { io, type Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:8000";

let socket: Socket | null = null;

// Lazily create a single shared Socket.IO connection to the Python
// ai-backend, used for live battle state and matchmaking events.
export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ["websocket"],
    });
  }
  return socket;
}
