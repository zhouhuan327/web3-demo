// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint256 counts;

    constructor() {
        counts = 0;
    }

    function add() public {
        counts = counts + 1;
    }

    function getCounts() public view returns (uint256) {
        return counts;
    }
}
