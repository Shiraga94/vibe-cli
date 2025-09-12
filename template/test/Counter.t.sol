// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
  Counter public counter;

  function setUp() public {
    counter = new Counter();
  }

  function test_Increment() public {
    counter.increment();
    assertEq(counter.number(), 1);
  }

  function test_Decrement() public {
    counter.increment();
    counter.decrement();
    assertEq(counter.number(), 0);
  }
}