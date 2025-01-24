"use client";
import React from "react";
import { useAccount } from "wagmi";
import { LoginForm } from "@/components/sections/loginform";

import useAuthStatus from "@/hooks/useAuthStatus";
const Page = () => {
  const { address, isConnecting, isReconnecting } = useAccount();

  const { authStatus } = useAuthStatus();
  console.log("authStatus::", authStatus);

  // Show login form if not authenticated and not in a connecting state
  if (
    !address &&
    !isConnecting &&
    !isReconnecting &&
    authStatus !== "loading"
  ) {
    return <LoginForm />;
  }

  return;
};

export default Page;
