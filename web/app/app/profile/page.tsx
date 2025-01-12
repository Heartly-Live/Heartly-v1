"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { DepositDialog } from "@/components/sections/depositDialog";
import { ListenerRegistrationDialog } from "@/components/sections/listenerRegistration";
import { Wallet } from "lucide-react";
import {
  ConnectWallet,
  useDisconnectWallet,
} from "@/components/ui/connectButton";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { SUBGRAPH_URL, USDC_ADDRESS } from "@/lib/consts";
import request, { gql } from "graphql-request";
import { publicClient } from "@/lib/client";

export default function ProfilePage() {
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [showListenerDialog, setShowListenerDialog] = useState(false);
  const [isListener, setIsListener] = useState(false); // This would come from your auth state
  const router = useRouter();
  const disconnectWallet = useDisconnectWallet();
  const [expert, setExpert] = useState<any>();
  const [balance, setBalance] = useState(0);

  const { address } = useAccount();

  const fetchUserProfile = async (address: string) => {
    try {
      const data: any = await request(
        SUBGRAPH_URL,
        gql`
          query MyQuery {
            experts(where: { id: "${address.toLowerCase()}" }) {
              balance
              cid
              expertise
              flags
              id
              isRegistered
              name
              rating
              voiceRatePerMinute
              videoRatePerMinute
              calls {
                id
              }
            }
            users(where: { id: "${address.toLowerCase()}" }) {
              balance
              id
            }
          }
        `
      );
      console.log(data);
      if (data.experts.length > 0) {
        setIsListener(true);
        setExpert(data.experts[0]);
      }
      if (data.users.length > 0) {
        setBalance(data.users[0].balance / 10 ** 6);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (address) {
      fetchUserProfile(address);
    }
  }, [address]);

  const handleLogout = () => {
    disconnectWallet(); // Disconnect the wallet
    router.push("/app"); // Navigate back to the previous screen
  };

  if (!address) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-md mx-auto p-4 pb-16">
          <div className="flex flex-col items-center gap-4 mb-8">
            <h1 className="text-2xl font-bold">Connect Wallet</h1>
            <div className="flex items-center gap-2">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-md mx-auto p-4 pb-16">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white relative">
              <AvatarImage
                src="/placeholder.svg"
                alt={isListener ? expert.name : "Anonymous User"}
              />
              <AvatarFallback>
                {" "}
                {isListener ? expert.name : "Anonymous"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full blur-xl opacity-50" />
          </div>
          <h1 className="text-2xl font-bold">
            {isListener ? expert.name : "Anonymous User"}
          </h1>
          <div className="flex items-center gap-2">
            <ConnectWallet />
          </div>
        </div>

        {/* Balance Section */}
        <Card className="mb-6 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Balance</h2>
                <p className="text-3xl font-bold text-primary">
                  ${balance.toFixed(2)}
                </p>
              </div>
              <Wallet className="w-10 h-10 text-muted-foreground" />
            </div>
            <Button
              className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white"
              onClick={() => setShowDepositDialog(true)}
            >
              Add Balance
            </Button>
          </CardContent>
        </Card>

        {/* Listener Section */}
        <Card>
          <CardContent className="p-6 bg-white">
            {!isListener ? (
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">
                  Become a Listener
                </h2>
                <p className="text-muted-foreground mb-4">
                  Help others and earn money by becoming a listener
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white"
                  onClick={() => setShowListenerDialog(true)}
                >
                  Register as Listener
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="mt-4 bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold mb-4">Listener Profile</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expertise</span>
                    <span className="font-medium">{expert.expertise}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Voice Rate</span>
                    <span className="font-medium">
                      ${expert.voiceRatePerMinute / 10 ** 6}/min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Video Rate</span>
                    <span className="font-medium">
                      ${expert.videoRatePerMinute / 10 ** 6}/min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium">⭐️ {expert.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Calls</span>
                    <span className="font-medium">{expert.calls.length}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <DepositDialog
        open={showDepositDialog}
        onOpenChange={setShowDepositDialog}
        account={address}
      />

      <ListenerRegistrationDialog
        open={showListenerDialog}
        onOpenChange={setShowListenerDialog}
      />
    </div>
  );
}
