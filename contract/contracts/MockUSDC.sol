// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("USD Coin", "USDC") {
        // Mint 10000 USDC to deployer (with 6 decimals)
        _mint(msg.sender, 10000 * 1000000);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}x