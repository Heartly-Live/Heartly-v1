import { publicClient, walletClient } from "../client";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../consts";

// Account is a account object from wagmi or viem. get it using useAccount() hook
export const cancelCall = async (callId: string, account: any) => {
  // CallID is bytes32 , so get this from the graph and pass it to the contract
  const tx = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "cancelCall",
    args: [callId],
    account,
  });

  console.log(tx);
};

// To Deposit USDC to the contract by user
export const deposit = async (amount: number, account: any) => {
  // If the amount is in USDC , we need to convert it to wei
  const amountInWei = amount * 10 ** 6;

  const tx = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "deposit",
    args: [amountInWei],
    account,
  });

  console.log(tx);
};

// To endCall by listener or a  user
export const endCall = async (
  callId: string,
  rating: number,
  flag: boolean,
  account: any
) => {
  // CallID is bytes32 , so get this from the graph and pass it to the contract
  const tx = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "endCall",
    args: [callId, rating, flag],
    account,
  });
  console.log(tx);
};

// Expert withdraw balance
export const expertWithdrawBalance = async (amount: number, account: any) => {
  const amountInWei = amount * 10 ** 6;
  const tx = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "expertWithdrawBalance",
    args: [amountInWei],
    account,
  });
  console.log(tx);
};

// Platform Fee withdrawl

export const platformWithdrawBalance = async (amount: number, account: any) => {
  const amountInWei = amount * 10 ** 6;
  const tx = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "platformWithdrawBalance",
    args: [amountInWei],
    account,
  });
  console.log(tx);
};

// register expert
export const registerExpert = async (
  name: string,
  expertise: string,
  voiceRatePerMinute: number,
  videoRatePerMinute: number,
  cid: string,
  account: any
) => {
  // get the rates in USDC , convert it to wei
  const voiceRatePerMinuteInWei = voiceRatePerMinute * 10 ** 6;
  const videoRatePerMinuteInWei = videoRatePerMinute * 10 ** 6;

  // get the cid , by uploading the image to the ipfs file , which will return the cid. After that process call this function

  const tx = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "registerExpert",
    args: [
      name,
      expertise,
      voiceRatePerMinuteInWei,
      videoRatePerMinuteInWei,
      cid,
    ],
    account,
  });
  console.log(tx);
};

// Schedule Call ( User can schedule a call by calling this function ) -> user requesting a call
// Can only be called by user
export const scheduleCall = async (
  expertAddress: string,
  callType: number,
  account: any
) => {
  // expertAddress is the address of the expert
  // CallType is 0 for voice and 1 for video
  const tx = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "scheduleCall",
    args: [expertAddress, callType],
    account,
  });
  console.log(tx);
};

// When the call is accepted by the expert or listener .
// Only called by the listener.
export const startCall = async (callId: string, account: any) => {
  // CallID is bytes32 , so get this from the graph and pass it to the contract
  const tx = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "startCall",
    args: [callId],
    account,
  });
  console.log(tx);
};

export const updateCallRates = async (
  expertAddress: string,
  isVoice: boolean,
  updatedRate: number,
  account: any
) => {
  // expertAddress is the address of the expert
  // isVoice is true for voice and false for video , accordingly the rates are updated .

  // update the usdc to wei
  const amountInWei = updatedRate * 10 ** 6;
  const tx = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "updateCallRates",
    args: [expertAddress, isVoice, amountInWei],
    account,
  });
  console.log(tx);
};

// To withdraw balance by user
export const withdrawBalance = async (amount: number, account: any) => {
  const amountInWei = amount * 10 ** 6;
  const tx = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "withdrawBalance",
    args: [amountInWei],
    account,
  });
  console.log(tx);
};

// If in case you need to have any read calls to contract

export const getCallDetails = async (callId: string) => {
  const call = await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getCallDetails",
    args: [callId],
  });
  console.log(call);
};

// Note , if you want to make any write calls to the contract , you can use the walletClient
// if you want to make any read calls to the contract , you can use the publicClient
