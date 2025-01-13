import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { createSiweMessage } from "viem/siwe";

const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    const nonceResponse = await fetch(
      `${process.env.BASE_HTTP_URL}/auth/request-nonce`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body : JSON.stringify({walletAddress})
      },
    );

    const nonceData = await nonceResponse.json();
    const nonce = nonceData.nonce;
    return nonce;
  },

  createMessage: ({ nonce, address, chainId }) => {
    return createSiweMessage({
      domain: window.location.host,
      address,
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce,
    });
  },

  verify: async ({ message, signature }) => {
    const verifyRes = await fetch(
      `${process.env.BASE_HTTP_URL}/auth/verify-signature`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //walletAddress,
          signature,
          message,
        }),
      },
    );

    const verifyData = await verifyRes.json();
    if (verifyData.token) {
      localStorage.setItem("token", `Bearer ${verifyData.token}`);
      return true;
    } else {
      return false;
    }
  },

  signOut: async () => {
    //console.log("Signing out");
  },
});
