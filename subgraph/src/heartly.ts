import { BigInt, log } from "@graphprotocol/graph-ts";
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
  PlatformBalanceWithdrawn as PlatformBalanceWithdrawnEvent,
} from "../generated/Heartly/Heartly";
import {
  Call,
  User,
  Expert,
  Deposit,
  Withdrawal,
  Platform,
} from "../generated/schema";

export function handleBalanceWithdrawn(event: BalanceWithdrawnEvent): void {
  log.info("Balance Withdrawn: {}", [event.params.amount.toString()]);
  let user = User.load(event.params.user.toHexString());
  if (user != null) {
    let withdrawal = new Withdrawal(event.transaction.hash.toHexString());
    withdrawal.amount = event.params.amount;
    withdrawal.timestamp = event.block.timestamp;
    withdrawal.user = user.id;
    withdrawal.save();
    user.balance = user.balance.minus(event.params.amount);
    user.save();
  }
}

export function handleCallCancelled(event: CallCancelledEvent): void {
  log.info("Call Cancelled: {}", [event.params.callId.toHexString()]);
  let call = Call.load(event.params.callId.toHexString());
  if (call != null) {
    call.status = "CANCELLED";
    call.save();
  }
}

export function handleCallEnded(event: CallEndedEvent): void {
  log.info("Call Ended: {}", [event.params.callId.toHexString()]);
  let call = Call.load(event.params.callId.toHexString());
  if (call != null) {
    call.status = "ENDED";
    call.actualDuration = event.params.duration;
    call.amountPaid = event.params.amount;
    call.save();

    let expert = Expert.load(call.expert);
    if (expert != null) {
      let platform = Platform.load("1");
      if (platform == null) {
        platform = new Platform("1");
        platform.totalFeesCollected = BigInt.fromI32(0);
        platform.save();
      }
      const platformFee = BigInt.fromI32(20)
        .times(event.params.amount)
        .div(BigInt.fromI32(100));
      platform.totalFeesCollected =
        platform.totalFeesCollected.plus(platformFee);
      expert.balance = expert.balance.plus(
        event.params.amount.minus(platformFee)
      );

      if (event.params.amount < call.stakedAmount) {
        let user = User.load(call.user);
        if (user != null) {
          user.balance = user.balance.plus(
            call.stakedAmount.minus(event.params.amount)
          );
          user.save;
        }
        expert.save();
      }
    }
  }
}

export function handleCallScheduled(event: CallScheduledEvent): void {
  log.info("Call Scheduled: {}", [event.params.callId.toHexString()]);
  let user = User.load(event.params.user.toHexString());
  let expert = Expert.load(event.params.expert.toHexString());

  if (user !== null && expert !== null) {
    let call = new Call(event.params.callId.toHexString());
    call.user = user.id;
    call.callType = event.params.callType == 1 ? "VIDEO" : "VOICE";
    call.expert = expert.id;
    call.scheduledDuration = event.params.duration;
    call.stakedAmount = event.params.stakedAmount;
    call.scheduledAt = event.block.timestamp;
    call.status = "SCHEDULED";
    call.save();
  }
}

export function handleCallStarted(event: CallStartedEvent): void {
  log.info("Call Started: {}", [event.params.callId.toHexString()]);
  let call = Call.load(event.params.callId.toHexString());
  if (call != null) {
    call.status = "STARTED";
    call.startTime = event.params.startTime;
    let user = User.load(call.user);
    if (user != null) {
      user.balance = user.balance.minus(call.stakedAmount);
      user.save();
    }
    call.save();
  }
}

export function handleDeposited(event: DepositedEvent): void {
  log.info("Deposited: {}", [event.params.amount.toString()]);
  let user = User.load(event.params.user.toHexString());
  if (user == null) {
    user = new User(event.params.user.toHexString());
    user.balance = BigInt.fromI32(0);
    user.save();
  }
  let deposit = new Deposit(event.transaction.hash.toHexString());
  deposit.amount = event.params.amount;
  deposit.timestamp = event.block.timestamp;
  user.balance = user.balance.plus(event.params.amount);
  deposit.user = user.id;
  deposit.save();
  user.save();
}

export function handleExpertBalanceWithdrawn(
  event: ExpertBalanceWithdrawnEvent
): void {
  log.info("Expert Balance Withdrawn: {}", [event.params.amount.toString()]);
  let expert = Expert.load(event.params.user.toHexString());
  if (expert != null) {
    let withdrawal = new Withdrawal(event.transaction.hash.toHexString());
    withdrawal.amount = event.params.amount;
    withdrawal.timestamp = event.block.timestamp;
    withdrawal.expert = expert.id;
    withdrawal.save();
    expert.balance = expert.balance.minus(event.params.amount);
    expert.save();
  }
}

export function handleExpertRegistered(event: ExpertRegisteredEvent): void {
  log.info("Expert Registered: {}", [event.params.expert.toHexString()]);
  let entity = new Expert(event.params.expert.toHexString());
  entity.name = event.params.name;
  entity.videoRatePerMinute = event.params.videoRate;
  entity.voiceRatePerMinute = event.params.voiceRate;
  entity.balance = BigInt.fromI32(0);
  entity.isRegistered = true;
  entity.expertise = event.params.expertise;
  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {}

export function handlePlatformBalanceWithdrawn(
  event: PlatformBalanceWithdrawnEvent
): void {
  log.info("Platform Balance Withdrawn: {}", [event.params.amount.toString()]);
  let platform = Platform.load("1");
  if (platform == null) {
    platform = new Platform("1");
    platform.totalFeesCollected = BigInt.fromI32(0);
    platform.save();
  }
  let withdrawal = new Withdrawal(event.transaction.hash.toHexString());
  withdrawal.amount = event.params.amount;
  withdrawal.timestamp = event.block.timestamp;
  withdrawal.platform = platform.id;
  withdrawal.save();
}
