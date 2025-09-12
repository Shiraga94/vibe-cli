// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

contract Counter {
  uint public number;

  function setNumber(uint newNumber) public {
    number = newNumber;
  }

  function increment() public {
    number++;
  }

  function decrement() public {
    number--;
  }
}