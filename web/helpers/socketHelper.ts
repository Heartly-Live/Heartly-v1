import { io } from "socket.io-client";

export function getSocket(jwtToken?: string) {
  const socket = io("http://localhost:8001", {
    path: "/socket/",
    //   auth: { token: jwtToken },
  });
  return socket;
}
