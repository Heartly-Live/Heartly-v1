import { createPublicClient, createWalletClient, http } from "viem";
import { baseSepolia } from "viem/chains";

// Change the chain , whenerver required

// use this for write operations
export const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(),
});

// use this for read operations
export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});
