const { Incident } = require('./incident');
const { Resource } = require('./resource');
const { allocateResource } = require('./allocation');

const resources = [
  new Resource({ id: 'AMB-101', latitude: 40.7128, longitude: -74.0060 }),
  new Resource({ id: 'AMB-202', latitude: 40.7306, longitude: -73.9352 }),
  new Resource({ id: 'AMB-303', latitude: 40.6892, longitude: -74.0445 })
];

function createPredefinedIncident({ serviceDuration, ...incidentDetails }) {
  const incident = new Incident(incidentDetails);
  incident.serviceDuration = serviceDuration;
  return incident;
}

const predefinedIncidents = [
  createPredefinedIncident({
    id: 'INC-001',
    priority: 'CRITICAL',
    latitude: 40.7401,
    longitude: -74.0287,
    arrivalTime: 1,
    serviceDuration: 2
  }),
  createPredefinedIncident({
    id: 'INC-002',
    priority: 'MEDIUM',
    latitude: 40.6991,
    longitude: -74.0763,
    arrivalTime: 3,
    serviceDuration: 4
  }),
  createPredefinedIncident({
    id: 'INC-003',
    priority: 'HIGH',
    latitude: 40.6924,
    longitude: -73.9771,
    arrivalTime: 5,
    serviceDuration: 3
  }),
  createPredefinedIncident({
    id: 'INC-004',
    priority: 'CRITICAL',
    latitude: 40.7181,
    longitude: -73.9247,
    arrivalTime: 7,
    serviceDuration: 2
  }),
  createPredefinedIncident({
    id: 'INC-005',
    priority: 'LOW',
    latitude: 40.7250,
    longitude: -73.9900,
    arrivalTime: 8,
    serviceDuration: 3
  })
];

const incidents = [];

console.log('Initial ambulance resources:');
resources.forEach((resource) => {
  console.log(`- ${resource.id}: (${resource.latitude}, ${resource.longitude}) status=${resource.status}`);
});

console.log('\nPredefined incident scenario:');
predefinedIncidents.forEach((incident) => {
  console.log(
    `- ${incident.id}: priority=${incident.priority}, location=(${incident.latitude}, ${incident.longitude}), arrivalTime=${incident.arrivalTime}`
  );
});

const totalTimeSteps = 10;

for (let step = 1; step <= totalTimeSteps; step++) {
  console.log(`\nTime step ${step}`);

  incidents.forEach((incident) => {
    if (incident.status === 'ASSIGNED' && incident.completionTime <= step) {
      const assignedResource = resources.find(
        (resource) => resource.assignedIncidentId === incident.id
      );

      if (assignedResource) {
        assignedResource.status = 'AVAILABLE';
        assignedResource.assignedIncidentId = null;
        incident.status = 'COMPLETED';

        console.log(
          `Resource ${assignedResource.id} completed incident ${incident.id} and is available again.`
        );
      }
    }
  });

  const arrivingIncidents = predefinedIncidents.filter(
    (incident) => incident.arrivalTime === step
  );

  if (arrivingIncidents.length === 0) {
    console.log('No incident this time step.');
    continue;
  }

  arrivingIncidents.forEach((incident) => {
    incidents.push(incident);

    console.log('Incident arrived:');
    console.log(`- id: ${incident.id}`);
    console.log(`- priority: ${incident.priority}`);
    console.log(`- location: (${incident.latitude}, ${incident.longitude})`);

    const allocation = allocateResource(incidents, resources);

    if (allocation) {
      const allocatedIncident = allocation.incident;
      allocatedIncident.completionTime = allocatedIncident.arrivalTime
        + allocatedIncident.serviceDuration;

      console.log(`- assigned resource id: ${allocation.resource.id}`);
      console.log(`- calculated distance: ${allocation.distance.toFixed(2)} km`);
      console.log(`- service duration: ${allocatedIncident.serviceDuration} time steps`);
      console.log(`- completion time: ${allocatedIncident.completionTime}`);
    } else {
      console.log('No available resource for the current pending incidents.');
    }
  });
}

console.log('\nAll incidents created during the simulation:');
incidents.forEach((incident) => {
  console.log(`- ${incident.id}: status=${incident.status}, priority=${incident.priority}, coordinates=(${incident.latitude}, ${incident.longitude})`);
});
