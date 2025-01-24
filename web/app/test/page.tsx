"use client";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { LoginForm } from "@/components/sections/loginform";
import { Header } from "@/components/sections/header";
import useAuthStatus from "@/hooks/useAuthStatus";
import { ListenersList } from "@/components/sections/listenerlist";
import NoSsr from "@/components/NoSsr";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const { address, isConnecting, isReconnecting } = useAccount();
  const router = useRouter();
  const context = useSocket();
  if (!context) {
    return null;
  }
  const { socket, connectSocket } = context;

  useEffect(() => {
    if (!socket) {
      return;
    }
    connectSocket();
  }, [socket]);

  const { authStatus } = useAuthStatus();
  console.log("authStatus::", authStatus);

  if (
    !address &&
    !isConnecting &&
    !isReconnecting &&
    authStatus !== "loading"
  ) {
    return <LoginForm />;
  } else if (authStatus !== "loading") {
    router.push("/test/listeners");
  }
  return null;
};

export default Page;
