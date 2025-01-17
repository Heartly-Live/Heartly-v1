"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  authenticationAdapter,
  setCurrentAddress,
} from "@/helpers/authenticationAdapter";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [baseSepolia, base],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

// Separate component for authentication logic
const AuthenticatedProvider = ({ children }: { children: React.ReactNode }) => {
  const { address, isConnecting } = useAccount();
  const { authStatus, handleAuthStatus } = useAuthStatus();

  useEffect(() => {
    handleAuthStatus(address, isConnecting);
  }, [address, isConnecting]);

  useEffect(() => {
    if (address) {
      setCurrentAddress(address);
    }
  }, [address]);

  return (
    <RainbowKitAuthenticationProvider
      status={authStatus}
      adapter={authenticationAdapter}
    >
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </RainbowKitAuthenticationProvider>
  );
};

// Main provider component
export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AuthenticatedProvider>{children}</AuthenticatedProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
