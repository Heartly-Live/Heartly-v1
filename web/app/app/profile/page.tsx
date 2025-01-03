"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { DepositDialog } from "@/components/sections/depositDialog";
import { ListenerRegistrationDialog } from "@/components/sections/listenerRegistration";
import { Wallet } from "lucide-react";
import { ConnectWallet } from "@/components/ui/connectButton";

export default function ProfilePage() {
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [showListenerDialog, setShowListenerDialog] = useState(false);
  const [isListener, setIsListener] = useState(false); // This would come from your auth state

  const userProfile = {
    name: "Sarah Wilson",
    balance: 50.0,
    listenerProfile: isListener
      ? {
          expertise: "Clinical Psychology",
          voiceRate: 2.5,
          videoRate: 5.0,
          rating: 4.8,
          totalCalls: 128,
        }
      : null,
  };

  useEffect(() => {
    setIsListener(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-md mx-auto p-4 pb-16">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full blur-xl opacity-50" />
            <Avatar className="w-32 h-32 border-4 border-white relative">
              <AvatarImage src="/placeholder.svg" alt={userProfile.name} />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-2xl font-bold">{userProfile.name}</h1>
          <ConnectWallet />
        </div>

        {/* Balance Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Balance</h2>
                <p className="text-3xl font-bold text-primary">
                  ${userProfile.balance.toFixed(2)}
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
          <CardContent className="p-6">
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
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold mb-4">Listener Profile</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expertise</span>
                    <span className="font-medium">
                      {userProfile.listenerProfile?.expertise}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Voice Rate</span>
                    <span className="font-medium">
                      ${userProfile.listenerProfile?.voiceRate}/min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Video Rate</span>
                    <span className="font-medium">
                      ${userProfile.listenerProfile?.videoRate}/min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium">
                      ⭐️ {userProfile.listenerProfile?.rating}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Calls</span>
                    <span className="font-medium">
                      {userProfile.listenerProfile?.totalCalls}
                    </span>
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
      />

      <ListenerRegistrationDialog
        open={showListenerDialog}
        onOpenChange={setShowListenerDialog}
      />
    </div>
  );
}
