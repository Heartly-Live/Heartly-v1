import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Peer, { MediaConnection } from "peerjs";
import { v4 as uuidV4 } from "uuid";

interface PeerContextType {
  peer: Peer | null;
  createPeer: () => Peer;
  getPeerId: () => string | null;
  disconnectPeer: () => void;
}

const PeerContext = createContext<PeerContextType | null>(null);

export const PeerProvider = ({ children }: { children: ReactNode }) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [peerId, setPeerId] = useState<string | null>(null);

  const createPeer = (): Peer => {
    if (peer) return peer;

    const id = uuidV4();
    const options = {
      host: "heartly.live/api",
      path: "/peerjs/peer",
      secure: true,
    };
    const newPeer = new Peer(id, options);

    newPeer.on("open", (id) => {
      console.log("Peer ID:", id);
      setPeerId(id);
      setPeer(newPeer);
    });

    return newPeer;
  };

  const getPeerId = () => peerId;

  const disconnectPeer = () => {
    if (peer) {
      peer.disconnect();
      setPeer(null);
      setPeerId(null);
    }
  };

  return (
    <PeerContext.Provider
      value={{ peer, createPeer, getPeerId, disconnectPeer }}
    >
      {children}
    </PeerContext.Provider>
  );
};

export const usePeer = () => useContext(PeerContext);
