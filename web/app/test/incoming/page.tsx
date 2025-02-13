"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { showSuccessMsg, showErrMsg } from "@/core/helper/utils";
import { useSocket } from "@/context/SocketContext";
import { usePeer } from "@/context/PeerContext";
import { useEffect } from "react";

export default function IncomingCallPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const caller = searchParams.get("caller");
  const roomId = searchParams.get("roomId");

  const context = useSocket();
  if (!context) {
    console.log("Cannot get context");
    return null;
  }

  const { socket, connectSocket } = context;

  useEffect(() => {
    if (!socket) {
      console.log("Cannot get socket");
      return;
    }
    connectSocket();
  }, [socket]);

  const peerContext = usePeer();
  if (!peerContext) {
    console.log("Cannot get peer context");
    return null;
  }

  let { peer, createPeer, getPeerId, disconnectPeer } = peerContext;

  useEffect(() => {
    if (!peer) {
      peer = createPeer();
    }
  }, [peer]);

  const handleAcceptCall = () => {
    const peerId = getPeerId();
    console.log("Peer id: ", peerId);
    socket?.emit("call-accepted", { caller, roomId, peerId });
    const role = "receiver";
    router.push(`/test/call/videoCall?peerId=${peerId}&role=${role}`);
    //showSuccessMsg("Call accepted");
    //router.push("/test/call/123"); // Replace 123 with actual call ID
  };

  const handleDeclineCall = () => {
    disconnectPeer();
    socket?.emit("call-denied", { caller, roomId });
    //showErrMsg("Call declined");
    //router.push("/test/listeners");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-300 to-pink-300">
      {/* Ripple Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/20"
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{
              scale: [0.1, 2],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${50 + i * 20}px`,
              height: `${50 + i * 20}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative h-screen flex flex-col items-center justify-between p-6">
        <div className="flex flex-col items-center gap-4 mt-20">
          {/* Profile Image */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
            <Image
              src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Caller"
              fill
              className="object-cover"
            />
          </div>

          {/* Caller Info */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Incoming Call
            </h2>
            <p className="text-xl text-white mb-4">Patient Listener</p>
            <motion.p
              className="text-white text-lg"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Calling...
            </motion.p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 mb-10 w-full max-w-md justify-center">
          <Button
            variant="secondary"
            size="lg"
            className="w-40 bg-red-500 text-white hover:bg-red-600"
            onClick={handleDeclineCall}
          >
            Decline
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-40 bg-green-500 text-white hover:bg-green-600"
            onClick={handleAcceptCall}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
