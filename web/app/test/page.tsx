"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import {
  ConnectWallet,
  useDisconnectWallet,
} from "@/components/ui/connectButton"; // Import disconnect function
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import ListenerCard from "@/components/sections/listener-card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { gql, request } from "graphql-request";
import { SUBGRAPH_URL } from "@/lib/consts";

const Page = () => {
  const { address } = useAccount();
  const router = useRouter();
  const disconnectWallet = useDisconnectWallet(); // Use the custom hook
  const [listeners, setListeners] = useState<any>([]);

  const handleLogout = () => {
    disconnectWallet(); // Disconnect the wallet
    router.push("/test"); // Navigate back to the previous screen
  };

  const fetchListeners = async () => {
    try {
      const data: any = await request(
        SUBGRAPH_URL,
        gql`
          query MyQuery {
            experts {
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
          }
        `
      );
      console.log(data.experts);
      setListeners(data.experts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListeners();
  }, []);

  if (!address) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-screen">
        {/* Existing login/connect wallet content */}
      </div>
    );
  }

  return (
    <div>
      {!address ? (
        <div className="flex flex-col justify-center items-center gap-4 h-screen">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex flex-col justify-center items-center gap-4">
                <Image src={Logo} alt="Logo" className="w-16 h-16" />
                <div className="flex flex-col justify-center items-center">
                  <div className="text-3xl font-nunito font-bold">HEARTLY</div>
                  <div className="text-xs font-thin">Talk.Heal.Grow</div>
                  <div className="text-3xl font-nunito font-bold my-4">
                    Welcome Back!
                  </div>
                </div>
              </div>
              <Input
                placeholder="username"
                className="flex h-12 w-full rounded-lg border border-input bg-white px-4 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
              />
              <Button className="bg-gradient-to-r from-[#FEBF5D] to-[#FFA2C9] text-white px-6 py-2 rounded-lg">
                {" "}
                Login{" "}
              </Button>
              <p>New Here? Connect wallet to sign up 😊 </p>
              <ConnectWallet />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center gap-4">
          <section className="flex justify-center items-center w-full">
            <div className="flex justify-between items-center w-full p-4">
              <div className="flex items-center gap-4">
                <Image src={Logo} alt="Logo" className="w-12 h-12" />
                <div className="flex flex-col items-start">
                  <div className="text-2xl font-nunito font-bold">
                    {`Let&apos;s Talk`}
                  </div>
                  <div className="text-xs font-thin flex justify-center items-center gap-2">
                    <div>243 listeners online</div>
                    <div className="w-[8px] h-[8px] bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <Button
                variant="secondary"
                size="lg"
                className="mt-4 bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </section>
          {/* Main Content */}
          {listeners.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center">
                  <div className="text-3xl font-nunito font-bold">
                    No Listeners Found
                  </div>
                </div>
              </div>
            </div>
          )}
          <main className="px-4 space-y-4 w-full">
            {listeners.map((listener: any, i: any) => (
              <ListenerCard key={i} listener={listener} />
            ))}

            {/* Pagination */}
          </main>
        </div>
      )}
    </div>
  );
};

export default Page;
