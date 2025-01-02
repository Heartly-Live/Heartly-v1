"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/assets/Logo.png";

import { ConnectWallet } from "@/components/ui/connectButton";
import { useAccount } from "wagmi";
import BottomNavbar from "@/components/sections/BottomNavbar";
import { Button } from "@/components/ui/button";
import ListenerCard from "@/components/sections/listener-card";

const page = () => {
  const { address } = useAccount();
  const listeners = Array(8).fill({
    name: "Patient Listener",
    credentials: "M.A Clinical Psychology",
    rating: 3.2,
    calls: 23,
  });
  return (
    <div className="bg-gradient-to-b from-[#FFA2C933] to-[#FEBF5D33]">
      {!address ? (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center">
              <Image src={Logo} alt="Logo" className="w-16 h-16" />
              <div className="flex flex-col justify-center items-center">
                <div className="text-3xl font-nunito font-bold">HEARTLY</div>
                <div className="text-xs font-thin">Talk.Heal.Grow</div>
              </div>
            </div>
            <ConnectWallet />
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
                    Let's Talk
                  </div>
                  <div className="text-xs font-thin flex justify-center items-center gap-2">
                    <div>243 listeners online</div>
                    <div className="w-[8px] h-[8px] bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <Button variant={"outline"} className="font-nunito rounded-md">
                Filter
              </Button>
            </div>
          </section>
          <main className="px-4 space-y-4 w-full">
            {listeners.map((listener, i) => (
              <ListenerCard key={i} {...listener} />
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 py-4">
              <Button variant="ghost" size="sm">
                ←
              </Button>
              <span className="text-sm text-muted-foreground">
                1 2 3 . . . 23
              </span>
              <Button variant="ghost" size="sm">
                →
              </Button>
            </div>
          </main>
          <section className="flex justify-center items-center w-full">
            <BottomNavbar />
          </section>
        </div>
      )}
    </div>
  );
};

export default page;
