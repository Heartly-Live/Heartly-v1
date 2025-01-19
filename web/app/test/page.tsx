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
import { localStorage, utils } from "@/core/helper";
import { services } from "@/core/services";
import { NONCE, USER_LISTENERS } from "@/core/services/api-urls";

const languages = [["English"], ["Spanish"]];

const Page = () => {
  const { address } = useAccount();
  const router = useRouter();
  const disconnectWallet = useDisconnectWallet(); // Use the custom hook
  const [listeners, setListeners] = useState<any>([]);
  const [filteredListeners, setFilteredListeners] = useState<any>([]);
  // const [listenersBe, setListenersBe] = useState<any>([]);
  const [isMount, setIsMount] = useState<any>(false);
  let nonce = localStorage.getAuthNonce();

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
      const updatedListeners = data.experts.map(
        (listener: any, index: number) => {
          let languages = [];
          if (index % 2 === 0) {
            languages = ["English", "Spanish"];
          } else {
            languages = ["English"];
          }
          return {
            ...listener,
            languages,
          };
        }
      );
      setListeners(updatedListeners);
      setFilteredListeners(updatedListeners);
      // setListeners(data.experts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListeners();
  }, []);

  // if (!address) {
  //   return (
  //     <div className="flex flex-col justify-center items-center gap-4 h-screen">
  //       {/* Existing login/connect wallet content */}
  //     </div>
  //   );
  // }

  const handleSign = async (address: any) => {
    try {
      //       const message = `${"Welcome to pearbee"}
      // Wallet address: ${address}`;
      //       const signResp = await signMessageAsync({ message });

      const payload = {
        address: address,
      };
      const resp = await services.post(NONCE, payload);
      if (resp) {
        const { data } = resp;
        // dispatch(
        //   loginAction({
        //     isLoggedIn: true,
        //     token: data?.authToken,
        //   })
        // );
        localStorage.setAuthNonce(resp?.data);
        utils.showSuccessMsg(resp?.message);
      }
    } catch (err) {
      console.error("err::", err);
      // utils.showErrMsg(CONST.MSG.USER_DENIED_SIGN_REQUEST);
    }
  };

  useEffect(() => {
    if (address) {
      let nonce = localStorage.getAuthNonce();
      if (!nonce && nonce === null) {
        handleSign(address);
      }
    }
  }, [address]);

  const handleGetListeners = async () => {
    try {
      const resp = await services.get(USER_LISTENERS);
    } catch (err) {
      console.log("err::", err);
    }
  };

  useEffect(() => {
    if (isMount) {
      handleGetListeners();
    }
  }, [isMount]);

  useEffect(() => {
    setIsMount(true);
  }, []);

  console.log("filteredListeners::", filteredListeners);


  const handleFilterExpertise = (event: any) => {
    const { value } = event.target;
    if (value) {
      const filterExpertise = listeners.filter(
        (ele: any) => ele?.expertise === value
      );
      console.log("filterExpertise::", filterExpertise);
      setFilteredListeners(filterExpertise);
    } else {
      setFilteredListeners(listeners);
    }
  };

  const handleLanguageFilter = (event: any) => {
    const { value } = event.target;
    if (value) {
      const filtered = listeners.filter((listener: any) =>
        listener.languages.includes(value)
      );
      setFilteredListeners(filtered);
    } else {
      setFilteredListeners(listeners);
    }
  };

  return (
    <div>
      {address ? (
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
              <p>Continue with a wallet 😊 </p>
              {/* <Input
                placeholder="username"
                className="flex h-12 w-full rounded-lg border border-input bg-white px-4 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
              /> */}
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
                    {`Let's Talk`}
                  </div>
                  <div className="text-xs font-thin flex justify-center items-center gap-2">
                    <div>243 listeners online</div>
                    <div className="w-[8px] h-[8px] bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="mt-4 px-4 py-2 rounded-lg bg-white text-black font-bold hover:bg-gradient-to-r from-orange-400 to-pink-400 transition-colors"
                  onChange={handleFilterExpertise}
                >
                  <option value="">Expertise</option>
                  <option value="relationships">Relationships</option>
                  <option value="Smart Contract">Smart Contract</option>
                  <option value="anxiety">Anxiety</option>
                  <option value="depression">Depression</option>
                  <option value="stress">Stress</option>
                </select>

                <select
                  className="mt-4 px-4 py-2 rounded-lg bg-white text-black font-bold hover:bg-gradient-to-r from-orange-400 to-pink-400 transition-colors"
                  onChange={handleLanguageFilter}
                >
                  <option value="">Languages</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>

                <select
                  className="mt-4 px-4 py-2 rounded-lg bg-white text-black font-bold hover:bg-gradient-to-r from-orange-400 to-pink-400 transition-colors"
                  onChange={(e) => {
                    // Add rating filter logic
                  }}
                >
                  <option value="">Rating</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>

                <Button
                  variant="secondary"
                  size="lg"
                  className="mt-4 bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </section>
          {/* Main Content */}
          {filteredListeners.length === 0 && (
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
            {filteredListeners.map((listener: any, i: any) => (
              <ListenerCard key={i} listener={listener} />
            ))}
          </main>
        </div>
      )}
    </div>
  );
};

export default Page;
