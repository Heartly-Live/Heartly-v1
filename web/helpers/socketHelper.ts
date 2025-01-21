import { localStorage } from "@/core/helper";
import { io } from "socket.io-client";

export function getSocket(jwtToken: string) {
  const socket = io(`${process.env.BASE_SOCKET_URL_PROD}`, {
    path: "/socket/",
    auth: { token: jwtToken },
  });
  return socket;
}
