"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import { ConnectWallet } from "@/components/ui/connectButton";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import ListenerCard from "@/components/sections/listener-card";

const Page = () => {
  const { address } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const listeners = Array(8).fill({
    name: "Patient Listener",
    credentials: "M.A Clinical Psychology",
    rating: 3.2,
    calls: 23,
  });

  // Only render the component after it has mounted on the client
  if (!hasMounted && !address) {
    return null; // Or a loading spinner
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
                </div>
              </div>
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
          </main>
        </div>
      )}
    </div>
  );
};

export default Page;
