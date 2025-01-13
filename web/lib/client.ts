import { createPublicClient, createWalletClient, custom, http } from "viem";
import { baseSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(),
});

// export const getWalletClient = () => {
//   if (typeof window !== "undefined" && window.ethereum) {
//     return createWalletClient({
//       chain: baseSepolia,
//       transport: custom(window.ethereum),
//     });
//   }
//   return null;
// };
