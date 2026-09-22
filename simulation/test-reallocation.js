const assert = require('node:assert/strict');
const {
  calculateWeightedDelay,
  calculateStayCost,
  calculateSwitchCost,
  shouldReallocate,
  evaluateReallocation
} = require('./reallocation');

const stayAssignments = [
  { priority: 'CRITICAL', responseTime: 12 },
  { priority: 'MEDIUM', responseTime: 4 }
];

const switchAssignments = [
  { priority: 'CRITICAL', responseTime: 5 },
  { priority: 'MEDIUM', responseTime: 10 }
];

assert.equal(calculateWeightedDelay('CRITICAL', 12), 120);
assert.equal(calculateWeightedDelay('MEDIUM', 4), 12);
assert.equal(calculateStayCost(stayAssignments), 132);
assert.equal(calculateSwitchCost(switchAssignments), 85);
assert.equal(shouldReallocate(132, 85), true);

const reallocationResult = evaluateReallocation(
  stayAssignments,
  switchAssignments
);

assert.deepEqual(reallocationResult, {
  shouldReallocate: true,
  stayCost: 132,
  switchCost: 85,
  improvement: 47
});

console.log('Reallocation test');
console.log('-----------------');
console.log(`Stay cost: ${reallocationResult.stayCost}`);
console.log(`Switch cost: ${reallocationResult.switchCost}`);
console.log(`Improvement: ${reallocationResult.improvement}`);
console.log(`Should reallocate: ${reallocationResult.shouldReallocate}`);

const noReallocationStayAssignments = [
  { priority: 'CRITICAL', responseTime: 5 },
  { priority: 'MEDIUM', responseTime: 5 }
];

const noReallocationSwitchAssignments = [
  { priority: 'CRITICAL', responseTime: 5 },
  { priority: 'MEDIUM', responseTime: 10 }
];

const noReallocationResult = evaluateReallocation(
  noReallocationStayAssignments,
  noReallocationSwitchAssignments
);

assert.equal(calculateStayCost(noReallocationStayAssignments), 65);
assert.equal(calculateSwitchCost(noReallocationSwitchAssignments), 85);
assert.equal(shouldReallocate(65, 85), false);
assert.deepEqual(noReallocationResult, {
  shouldReallocate: false,
  stayCost: 65,
  switchCost: 85,
  improvement: -20
});

console.log('\nNo-reallocation test');
console.log('--------------------');
console.log(`Stay cost: ${noReallocationResult.stayCost}`);
console.log(`Switch cost: ${noReallocationResult.switchCost}`);
console.log(`Improvement: ${noReallocationResult.improvement}`);
console.log(`Should reallocate: ${noReallocationResult.shouldReallocate}`);
