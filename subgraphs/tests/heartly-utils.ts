import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  BalanceWithdrawn,
  CallCancelled,
  CallEnded,
  CallScheduled,
  CallStarted,
  Deposited,
  ExpertBalanceWithdrawn,
  ExpertRegistered,
  OwnershipTransferred,
  PlatformBalanceWithdrawn
} from "../generated/Heartly/Heartly"

export function createBalanceWithdrawnEvent(
  user: Address,
  amount: BigInt
): BalanceWithdrawn {
  let balanceWithdrawnEvent = changetype<BalanceWithdrawn>(newMockEvent())

  balanceWithdrawnEvent.parameters = new Array()

  balanceWithdrawnEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  balanceWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return balanceWithdrawnEvent
}

export function createCallCancelledEvent(
  callId: Bytes,
  canceller: Address
): CallCancelled {
  let callCancelledEvent = changetype<CallCancelled>(newMockEvent())

  callCancelledEvent.parameters = new Array()

  callCancelledEvent.parameters.push(
    new ethereum.EventParam("callId", ethereum.Value.fromFixedBytes(callId))
  )
  callCancelledEvent.parameters.push(
    new ethereum.EventParam("canceller", ethereum.Value.fromAddress(canceller))
  )

  return callCancelledEvent
}

export function createCallEndedEvent(
  callId: Bytes,
  user: Address,
  expert: Address,
  duration: BigInt,
  amount: BigInt
): CallEnded {
  let callEndedEvent = changetype<CallEnded>(newMockEvent())

  callEndedEvent.parameters = new Array()

  callEndedEvent.parameters.push(
    new ethereum.EventParam("callId", ethereum.Value.fromFixedBytes(callId))
  )
  callEndedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  callEndedEvent.parameters.push(
    new ethereum.EventParam("expert", ethereum.Value.fromAddress(expert))
  )
  callEndedEvent.parameters.push(
    new ethereum.EventParam(
      "duration",
      ethereum.Value.fromUnsignedBigInt(duration)
    )
  )
  callEndedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return callEndedEvent
}

export function createCallScheduledEvent(
  callId: Bytes,
  user: Address,
  expert: Address,
  callType: i32,
  duration: BigInt,
  stakedAmount: BigInt
): CallScheduled {
  let callScheduledEvent = changetype<CallScheduled>(newMockEvent())

  callScheduledEvent.parameters = new Array()

  callScheduledEvent.parameters.push(
    new ethereum.EventParam("callId", ethereum.Value.fromFixedBytes(callId))
  )
  callScheduledEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  callScheduledEvent.parameters.push(
    new ethereum.EventParam("expert", ethereum.Value.fromAddress(expert))
  )
  callScheduledEvent.parameters.push(
    new ethereum.EventParam(
      "callType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(callType))
    )
  )
  callScheduledEvent.parameters.push(
    new ethereum.EventParam(
      "duration",
      ethereum.Value.fromUnsignedBigInt(duration)
    )
  )
  callScheduledEvent.parameters.push(
    new ethereum.EventParam(
      "stakedAmount",
      ethereum.Value.fromUnsignedBigInt(stakedAmount)
    )
  )

  return callScheduledEvent
}

export function createCallStartedEvent(
  callId: Bytes,
  user: Address,
  expert: Address,
  startTime: BigInt
): CallStarted {
  let callStartedEvent = changetype<CallStarted>(newMockEvent())

  callStartedEvent.parameters = new Array()

  callStartedEvent.parameters.push(
    new ethereum.EventParam("callId", ethereum.Value.fromFixedBytes(callId))
  )
  callStartedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  callStartedEvent.parameters.push(
    new ethereum.EventParam("expert", ethereum.Value.fromAddress(expert))
  )
  callStartedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )

  return callStartedEvent
}

export function createDepositedEvent(user: Address, amount: BigInt): Deposited {
  let depositedEvent = changetype<Deposited>(newMockEvent())

  depositedEvent.parameters = new Array()

  depositedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return depositedEvent
}

export function createExpertBalanceWithdrawnEvent(
  user: Address,
  amount: BigInt
): ExpertBalanceWithdrawn {
  let expertBalanceWithdrawnEvent = changetype<ExpertBalanceWithdrawn>(
    newMockEvent()
  )

  expertBalanceWithdrawnEvent.parameters = new Array()

  expertBalanceWithdrawnEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  expertBalanceWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return expertBalanceWithdrawnEvent
}

export function createExpertRegisteredEvent(
  expert: Address,
  name: string,
  voiceRate: BigInt,
  videoRate: BigInt
): ExpertRegistered {
  let expertRegisteredEvent = changetype<ExpertRegistered>(newMockEvent())

  expertRegisteredEvent.parameters = new Array()

  expertRegisteredEvent.parameters.push(
    new ethereum.EventParam("expert", ethereum.Value.fromAddress(expert))
  )
  expertRegisteredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  expertRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "voiceRate",
      ethereum.Value.fromUnsignedBigInt(voiceRate)
    )
  )
  expertRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "videoRate",
      ethereum.Value.fromUnsignedBigInt(videoRate)
    )
  )

  return expertRegisteredEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPlatformBalanceWithdrawnEvent(
  user: Address,
  amount: BigInt
): PlatformBalanceWithdrawn {
  let platformBalanceWithdrawnEvent = changetype<PlatformBalanceWithdrawn>(
    newMockEvent()
  )

  platformBalanceWithdrawnEvent.parameters = new Array()

  platformBalanceWithdrawnEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  platformBalanceWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return platformBalanceWithdrawnEvent
}
