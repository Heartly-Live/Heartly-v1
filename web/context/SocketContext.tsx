import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getSocket, disconnectSocket } from "../helpers/socketHelper";
import { Socket } from "socket.io-client";

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const socketInstance = getSocket();
    if (socketInstance) {
      socketInstance.connect();
      setSocket(socketInstance);
    }

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): Socket | null => useContext(SocketContext);
