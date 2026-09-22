const { Incident } = require('./incident');
const { Resource } = require('./resource');
const { evaluateReallocation } = require('./reallocation');

const assignedResource = new Resource({
  id: 'AMB-101',
  latitude: 40.7128,
  longitude: -74.0060,
  status: 'BUSY',
  assignedIncidentId: 'INC-001'
});

const availableResource = new Resource({
  id: 'AMB-202',
  latitude: 40.7306,
  longitude: -73.9352
});

const currentIncident = new Incident({
  id: 'INC-001',
  priority: 'HIGH',
  latitude: 40.7128,
  longitude: -74.0060,
  status: 'ASSIGNED'
});

const newIncident = new Incident({
  id: 'INC-002',
  priority: 'CRITICAL',
  latitude: 40.7306,
  longitude: -73.9352
});

const stayAssignments = [
  { priority: currentIncident.priority, responseTime: 10 },
  { priority: newIncident.priority, responseTime: 15 }
];

const switchAssignments = [
  { priority: currentIncident.priority, responseTime: 18 },
  { priority: newIncident.priority, responseTime: 5 }
];

const result = evaluateReallocation(stayAssignments, switchAssignments, 5);

console.log('Emergency reallocation scenario');
console.log('--------------------------------');
console.log(`Current assignment: ${currentIncident.id} (${currentIncident.priority}) -> ${assignedResource.id}`);
console.log(`Available resource: ${availableResource.id}`);
console.log(`New critical incident: ${newIncident.id} (${newIncident.priority})`);
console.log(`Stay cost: ${result.stayCost}`);
console.log(`Switch cost: ${result.switchCost}`);
console.log(`Improvement: ${result.improvement}`);
console.log(`Should reallocate: ${result.shouldReallocate}`);
