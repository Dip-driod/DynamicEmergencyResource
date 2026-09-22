const {
  allocateResource
} = require('./allocation');

const resources = [
  {
    id: 'AMB-101',
    latitude: 40.7128,
    longitude: -74.0060,
    status: 'AVAILABLE',
    assignedIncidentId: null
  },
  {
    id: 'AMB-202',
    latitude: 40.7306,
    longitude: -73.9352,
    status: 'AVAILABLE',
    assignedIncidentId: null
  },
  {
    id: 'AMB-303',
    latitude: 40.6892,
    longitude: -74.0445,
    status: 'AVAILABLE',
    assignedIncidentId: null
  }
];

const incidents = [
  {
    id: 'INC-001',
    priority: 'LOW',
    latitude: 40.7200,
    longitude: -74.0000,
    arrivalTime: 1,
    status: 'UNASSIGNED'
  },
  {
    id: 'INC-002',
    priority: 'CRITICAL',
    latitude: 40.7250,
    longitude: -73.9950,
    arrivalTime: 2,
    status: 'UNASSIGNED'
  },
  {
    id: 'INC-003',
    priority: 'HIGH',
    latitude: 40.7150,
    longitude: -74.0050,
    arrivalTime: 3,
    status: 'UNASSIGNED'
  }
];

const result = allocateResource(incidents, resources);

console.log('Selected incident:', result.incident.id);
console.log('Priority:', result.incident.priority);
console.log('Assigned resource:', result.resource.id);
console.log('Distance:', result.distance.toFixed(2), 'km');