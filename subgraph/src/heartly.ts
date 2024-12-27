import {
  BalanceWithdrawn as BalanceWithdrawnEvent,
  CallCancelled as CallCancelledEvent,
  CallEnded as CallEndedEvent,
  CallScheduled as CallScheduledEvent,
  CallStarted as CallStartedEvent,
  Deposited as DepositedEvent,
  ExpertBalanceWithdrawn as ExpertBalanceWithdrawnEvent,
  ExpertRegistered as ExpertRegisteredEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PlatformBalanceWithdrawn as PlatformBalanceWithdrawnEvent
} from "../generated/Heartly/Heartly"
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
} from "../generated/schema"

export function handleBalanceWithdrawn(event: BalanceWithdrawnEvent): void {
  let entity = new BalanceWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCallCancelled(event: CallCancelledEvent): void {
  let entity = new CallCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.callId = event.params.callId
  entity.canceller = event.params.canceller

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCallEnded(event: CallEndedEvent): void {
  let entity = new CallEnded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.callId = event.params.callId
  entity.user = event.params.user
  entity.expert = event.params.expert
  entity.duration = event.params.duration
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCallScheduled(event: CallScheduledEvent): void {
  let entity = new CallScheduled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.callId = event.params.callId
  entity.user = event.params.user
  entity.expert = event.params.expert
  entity.callType = event.params.callType
  entity.duration = event.params.duration
  entity.stakedAmount = event.params.stakedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCallStarted(event: CallStartedEvent): void {
  let entity = new CallStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.callId = event.params.callId
  entity.user = event.params.user
  entity.expert = event.params.expert
  entity.startTime = event.params.startTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposited(event: DepositedEvent): void {
  let entity = new Deposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExpertBalanceWithdrawn(
  event: ExpertBalanceWithdrawnEvent
): void {
  let entity = new ExpertBalanceWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExpertRegistered(event: ExpertRegisteredEvent): void {
  let entity = new ExpertRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.expert = event.params.expert
  entity.name = event.params.name
  entity.voiceRate = event.params.voiceRate
  entity.videoRate = event.params.videoRate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlatformBalanceWithdrawn(
  event: PlatformBalanceWithdrawnEvent
): void {
  let entity = new PlatformBalanceWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
