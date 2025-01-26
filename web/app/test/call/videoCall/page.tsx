// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function VideoStream() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
//   const [isStreaming, setIsStreaming] = useState(false);

//   // Request access to media devices
//   const startStream = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: false,
//       });

//       setMediaStream(stream);
//       setIsStreaming(true);

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (error) {
//       console.error("Error accessing media devices:", error);
//       alert("Error accessing camera. Please check permissions.");
//     }
//   };

//   // Stop the stream
//   const stopStream = () => {
//     if (mediaStream) {
//       mediaStream.getTracks().forEach((track) => track.stop());
//       setMediaStream(null);
//       setIsStreaming(false);

//       if (videoRef.current) {
//         videoRef.current.srcObject = null;
//       }
//     }
//   };

//   // Cleanup on component unmount
//   useEffect(() => {
//     return () => {
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [mediaStream]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">Video Stream Demo</h1>

//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               muted
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div className="flex justify-center gap-4">
//             <button
//               onClick={isStreaming ? stopStream : startStream}
//               className={`px-6 py-3 rounded-lg font-medium text-white ${
//                 isStreaming
//                   ? "bg-red-500 hover:bg-red-600"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } transition-colors`}
//             >
//               {isStreaming ? "Stop Streaming" : "Start Streaming"}
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 text-gray-600">
//           <p className="mb-2">Instructions:</p>
//           <ul className="list-disc list-inside">
//             <li>Click &quot;Start Streaming&quot; to begin video capture</li>
//             <li>Your browser will ask for camera permissions</li>
//             <li>Click &quot;Stop Streaming&quot; to end the session</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/video-stream/page.tsx

"use client";

import { usePeer } from "@/context/PeerContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function VideoStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const mediaSourceRef = useRef<MediaSource | null>(null);
  const sourceBufferRef = useRef<SourceBuffer | null>(null);

  const [myMediaStream, setMyMediaStream] = useState<MediaStream | null>(null);
  const [theirMediaStream, setTheirMediaStream] = useState<MediaStream | null>(
    null,
  );

  const searchParams = useSearchParams();
  const peerId = searchParams.get("peerId");
  const role = searchParams.get("role");

  const peerContext = usePeer();
  if (!peerContext) {
    console.log("Cant get peer context");
    return null;
  }
  let { peer, createPeer, getPeerId } = peerContext;

  useEffect(() => {
    if (role === "caller") {
      if (!peer) {
        peer = createPeer();
      }
      if (peerId && myMediaStream) {
        const call = peer.call(peerId, myMediaStream);

        call.on("stream", (stream) => {
          console.log("Recieving a call");
          setTheirMediaStream(stream);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (role === "reciever") {
      if (!peer) {
        console.log(
          "ERROR: Peer object has to exist for reciever to recieve calls",
        );
      } else {
        peer.on("call", (call) => {
          console.log("Recieving a call");
          if (myMediaStream) {
            call.answer(myMediaStream);
            call.on("stream", (stream) => {
              setTheirMediaStream(stream);
            });
          }
        });
      }
    }
  }, []);

  const initializeMediaSource = () => {
    mediaSourceRef.current = new MediaSource();

    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(mediaSourceRef.current);
    }

    mediaSourceRef.current.addEventListener("sourceopen", () => {
      sourceBufferRef.current = mediaSourceRef.current!.addSourceBuffer(
        'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
      );
      startWebSocketConnection();
    });
  };

  const startWebSocketConnection = () => {
    wsRef.current = new WebSocket("ws://localhost:3001");

    wsRef.current.onopen = () => {
      setIsConnected(true);
    };

    wsRef.current.onmessage = (event) => {
      if (sourceBufferRef.current && !sourceBufferRef.current.updating) {
        const data = new Uint8Array(event.data);
        sourceBufferRef.current.appendBuffer(data);
      }
    };

    wsRef.current.onclose = () => {
      setIsConnected(false);
    };
  };

  const stopStream = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    if (mediaSourceRef.current) {
      mediaSourceRef.current.endOfStream();
    }
  };

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Video Call</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              controls
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={isConnected ? stopStream : initializeMediaSource}
              className={`px-6 py-3 rounded-lg font-medium text-white ${
                isConnected
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition-colors`}
            >
              {isConnected ? "Stop Stream" : "Start Stream"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
