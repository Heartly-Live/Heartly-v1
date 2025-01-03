"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CallDetailsDialog from "./historyDialog";
import { PhoneCall, Video } from "lucide-react";

interface Call {
  id: string;
  callType: string;
  status: string;
  startTime: string;
  endTime: string;
  actualDuration: string;
  scheduledDuration: string;
  amountPaid: string;
  stakedAmount: string;
  user: { id: string };
  expert: { id: string };
}

const mockCalls: Call[] = [
  {
    id: "0xea2743f947ec8a64bd3ce85c07892d78b0f7b8e2869c71e24f637bff9a27cdd7",
    callType: "VOICE",
    status: "ENDED",
    startTime: "1735303072",
    endTime: "1735303072",
    scheduledDuration: "2",
    actualDuration: "2",
    amountPaid: "1000000",
    stakedAmount: "1000000",
    user: { id: "0x4b4b30e2e7c6463b03cdffd6c42329d357205334" },
    expert: { id: "0x76050f043a864114eafaecc35be4ad8dbe8fea9b" },
  },
  {
    id: "0xea2743f947ec8a64bd3ce85c07892d78b0f7b8e2869c71e24f637bff9a27cdd7",
    callType: "VIDEO",
    status: "ENDED",
    startTime: "1735303072",
    endTime: "1735303072",
    scheduledDuration: "2",
    actualDuration: "2",
    amountPaid: "1000000",
    stakedAmount: "1000000",
    user: { id: "0x4b4b30e2e7c6463b03cdffd6c42329d357205334" },
    expert: { id: "0x76050f043a864114eafaecc35be4ad8dbe8fea9b" },
  },
  // Add more mock calls here for testing
];

// Utility functions
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function formatAmount(amount: string): string {
  const amountInEth = parseInt(amount) / 1e18;
  return `${amountInEth.toFixed(4)} ETH`;
}

export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function HistoryPage() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFA2C933] to-[#FEBF5D33] p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Call History</h1>
      <div className="max-w-md mx-auto space-y-4">
        {mockCalls.map((call) => (
          <Card key={call.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {call.callType === "VOICE" ? "Voice" : "Video"} Call
                  </span>
                  {call.callType === "VOICE" ? (
                    <PhoneCall className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Video className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    call.status === "ENDED"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {call.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {formatDate(parseInt(call.startTime))}
              </div>
              <div className="flex justify-between items-center">
                <span>
                  Duration: {formatDuration(parseInt(call.actualDuration))}
                </span>
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-[#FEBF5D] to-[#FFA2C9] text-white py-2 px-4 rounded hover:bg-gradient-to-r hover:from-[#FFA2C9] hover:to-[#FEBF5D] hover:transition-colors duration-300 font-nunito text-base"
                  size="sm"
                  onClick={() => setSelectedCall(call)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedCall && (
        <CallDetailsDialog
          call={selectedCall}
          open={!!selectedCall}
          onOpenChange={() => setSelectedCall(null)}
        />
      )}
    </div>
  );
}
