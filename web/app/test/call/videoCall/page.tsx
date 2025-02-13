"use client";

import { usePeer } from "@/context/PeerContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function VideoStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");
  const [error, setError] = useState<string | null>(null);

  const [myMediaStream, setMyMediaStream] = useState<MediaStream | null>(null);
  const [theirMediaStream, setTheirMediaStream] = useState<MediaStream | null>(
    null
  );

  const searchParams = useSearchParams();
  const peerId = searchParams.get("peerId");
  const role = searchParams.get("role");

  const peerContext = usePeer();
  if (!peerContext) {
    console.log("Can't get peer context");
    return null;
  }
  const { peer, createPeer } = peerContext;

  useEffect(() => {
    if (!peer) {
      console.log("Creating new peer");
      const newPeer = createPeer();

      newPeer.on("open", (id) => {
        console.log("Peer opened with ID:", id);
      });

      newPeer.on("error", (err) => {
        console.error("Peer error:", err);
        setError(`Peer connection error: ${err.message}`);
      });
    }
  }, []);

  useEffect(() => {
    const initializeStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMyMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setError(
          "Failed to access camera and microphone. Please ensure permissions are granted."
        );
      }
    };

    initializeStream();

    return () => {
      myMediaStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (role === "caller" && peer && peerId && myMediaStream) {
      console.log("Initiating call as caller to:", peerId);
      setConnectionStatus("connecting");

      try {
        const call = peer.call(peerId, myMediaStream);

        if (!call) {
          console.error("Failed to initiate call");
          setError("Failed to initiate call");
          return;
        }

        call.on("stream", (remoteStream) => {
          console.log("Receiving remote stream as caller");
          setTheirMediaStream(remoteStream);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
          setConnectionStatus("connected");
          setIsConnected(true);
        });

        call.on("error", (err) => {
          console.error("Call error:", err);
          setError("Failed to connect to remote user");
          setConnectionStatus("disconnected");
        });

        call.on("close", () => {
          console.log("Call closed");
          setConnectionStatus("disconnected");
          setIsConnected(false);
        });

        return () => {
          call.close();
        };
      } catch (err) {
        console.error("Error making call:", err);
        setError("Failed to make call");
        setConnectionStatus("disconnected");
      }
    }
  }, [role, peer, peerId, myMediaStream]);

  useEffect(() => {
    if (role === "receiver" && peer && myMediaStream) {
      setConnectionStatus("connecting");

      const handleCall = (call: any) => {
        console.log("Receiving a call");
        call.answer(myMediaStream);

        call.on("stream", (remoteStream: MediaStream) => {
          console.log("Receiving remote stream");
          setTheirMediaStream(remoteStream);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
          setConnectionStatus("connected");
          setIsConnected(true);
        });

        call.on("error", (err: Error) => {
          console.error("Call error:", err);
          setError("Failed to connect to remote user");
          setConnectionStatus("disconnected");
        });

        call.on("close", () => {
          setConnectionStatus("disconnected");
          setIsConnected(false);
        });
      };

      peer.on("call", handleCall);

      return () => {
        peer.off("call", handleCall);
      };
    }
  }, [role, peer, myMediaStream]);

  const handleEndCall = () => {
    if (theirMediaStream) {
      theirMediaStream.getTracks().forEach((track) => track.stop());
    }
    if (myMediaStream) {
      myMediaStream.getTracks().forEach((track) => track.stop());
    }
    setIsConnected(false);
    setConnectionStatus("disconnected");
  };

  useEffect(() => {
    return () => {
      if (peer) {
        peer.destroy();
      }
      myMediaStream?.getTracks().forEach((track) => track.stop());
      theirMediaStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Video Call</h1>
          <div className="text-sm">
            Status:{" "}
            <span
              className={`font-medium ${
                connectionStatus === "connected"
                  ? "text-green-600"
                  : connectionStatus === "connecting"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {connectionStatus.charAt(0).toUpperCase() +
                connectionStatus.slice(1)}
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {/* Local Video */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center mt-2">You</p>
          </div>

          {/* Remote Video */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center mt-2">Remote User</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleEndCall}
            className="px-6 py-3 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
}
