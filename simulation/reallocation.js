const PRIORITY_WEIGHTS = {
  CRITICAL: 10,
  HIGH: 5,
  MEDIUM: 3,
  LOW: 1
};

const DEFAULT_SWITCHING_PENALTY = 5;

function getPriorityWeight(priority) {
  return PRIORITY_WEIGHTS[priority] || 0;
}

// WeightedDelay(i) = PriorityWeight(i) * PredictedResponseTime(i)
function calculateWeightedDelay(priority, responseTime) {
  return getPriorityWeight(priority) * responseTime;
}

// C_stay = sum(WeightedDelay(i)) for the current assignments.
function calculateStayCost(assignments) {
  return assignments.reduce(
    (totalCost, assignment) => totalCost
      + calculateWeightedDelay(assignment.priority, assignment.responseTime),
    0
  );
}

// C_switch = sum(WeightedDelay(i)) for the new assignments + switching penalty.
function calculateSwitchCost(
  assignments,
  switchingPenalty = DEFAULT_SWITCHING_PENALTY
) {
  return assignments.reduce(
    (totalCost, assignment) => totalCost
      + calculateWeightedDelay(assignment.priority, assignment.responseTime),
    switchingPenalty
  );
}

function shouldReallocate(stayCost, switchCost) {
  return switchCost < stayCost;
}

function evaluateReallocation(
  stayAssignments,
  switchAssignments,
  switchingPenalty = DEFAULT_SWITCHING_PENALTY
) {
  const stayCost = calculateStayCost(stayAssignments);
  const switchCost = calculateSwitchCost(switchAssignments, switchingPenalty);
  const improvement = stayCost - switchCost;

  return {
    shouldReallocate: shouldReallocate(stayCost, switchCost),
    stayCost,
    switchCost,
    improvement
  };
}

module.exports = {
  getPriorityWeight,
  calculateWeightedDelay,
  calculateStayCost,
  calculateSwitchCost,
  shouldReallocate,
  evaluateReallocation
};
