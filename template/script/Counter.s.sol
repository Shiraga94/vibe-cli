// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/Counter.sol";

contract Increment is Script {
  
  function run() external {
    uint privateKey = vm.envUint("DEV_PRIVATE_KEY");
    address addr = vm.envAddress("Counter");

    vm.startBroadcast(privateKey);

    Counter(addr).increment();

    vm.stopBroadcast();
  }
}

contract Decrement is Script {
  
  function run() external {
    uint privateKey = vm.envUint("DEV_PRIVATE_KEY");
    address addr = vm.envAddress("Counter");

    vm.startBroadcast(privateKey);

    Counter(addr).decrement();

    vm.stopBroadcast();
  }
}