import React, { useState } from "react";

const useAuthStatus = () => {
  const [authStatus, setAuthStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("unauthenticated");

  const handleAuthStatus = (
    address: `0x${string}` | undefined,
    isConnecting: boolean
  ) => {
    console.log(address, isConnecting);
    
    const token = localStorage.getItem("token");

    if (isConnecting && address) {
      setAuthStatus("loading");
      console.log("loading");
    } else if (address && token) {
        setAuthStatus("authenticated");
        console.log("authenticated");
    } else {
        setAuthStatus("unauthenticated");
        console.log("unauthenticated");
    }
  };
console.log(authStatus);

  return { authStatus, handleAuthStatus };
};

export default useAuthStatus;
