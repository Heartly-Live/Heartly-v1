import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getSocket, disconnectSocket } from "../helpers/socketHelper";
import { Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

interface SocketContextType {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const socketInstance = getSocket();
    if (socketInstance) setSocket(socketInstance);

    return () => {
      disconnectSocket();
    };
  }, []);

  const connectSocket = () => {
    if (socket && !isConnected) {
      socket.connect();
      setIsConnected(true);
      console.log("Socket connected");

      socket.on("User-not-found", () => {
        console.log(
          "Couldnt place the call as the user could not be found among those online",
        );
      });
      socket.on("call-request", ({ caller, roomId }) => {
        console.log("Handling call");
        router.push(`/test/incoming?caller=${caller}&roomId=${roomId}`);
      });
      socket.on("call-denied", ({ username }) => {
        console.log(`Call denied by reciever ${username}`);
      });
      socket.on("call-accepted", ({ username, peerId }) => {
        const role = "caller";
        console.log(`Call accepter by reciever ${username}`);
        router.push(`/test/call/videoCall?peerId=${peerId}&role=${role}`);
      });
    } else {
      console.log("Cant get socket");
    }
  };

  const handleDisconnect = () => {
    if (socket) {
      socket.disconnect();
      setIsConnected(false);
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, connectSocket, disconnectSocket: handleDisconnect }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType | null =>
  useContext(SocketContext);
