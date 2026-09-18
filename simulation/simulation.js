const { Incident } = require('./incident');
const { Resource } = require('./resource');

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

const resources = [
  new Resource({ id: 'AMB-101', latitude: 40.7128, longitude: -74.0060 }),
  new Resource({ id: 'AMB-202', latitude: 40.7306, longitude: -73.9352 }),
  new Resource({ id: 'AMB-303', latitude: 40.6892, longitude: -74.0445 })
];

resources.forEach((resource) => {
  resource.currentAssignment = null;
});

const incidents = [];

console.log('Initial ambulance resources:');
resources.forEach((resource) => {
  console.log(`- ${resource.id}: (${resource.latitude}, ${resource.longitude}) status=${resource.status}`);
});

const totalTimeSteps = 10;

for (let step = 1; step <= totalTimeSteps; step++) {
  const randomValue = Math.random();

  console.log(`\nTime step ${step}: random value = ${randomValue.toFixed(3)}`);

  if (randomValue < 0.3) {
    const incidentId = `INC-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const priority = PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)];
    const latitude = Number((Math.random() * (90 - (-90)) + (-90)).toFixed(4));
    const longitude = Number((Math.random() * (180 - (-180)) + (-180)).toFixed(4));

    const incident = new Incident({
      id: incidentId,
      priority,
      latitude,
      longitude
    });

    incident.status = 'PENDING';
    incidents.push(incident);

    console.log('Incident occurred!');
    console.log('Incident details:');
    console.log(`- id: ${incident.id}`);
    console.log(`- priority: ${incident.priority}`);
    console.log(`- coordinates: (${incident.latitude}, ${incident.longitude})`);

    const availableResource = resources.find((resource) => resource.status === 'AVAILABLE');

    if (availableResource) {
      availableResource.status = 'BUSY';
      availableResource.currentAssignment = incident.id;
      incident.status = 'ASSIGNED';

      console.log(`Assigned ambulance: ${availableResource.id}`);
      console.log(`Incident ${incident.id} is assigned to ${availableResource.id}`);
    } else {
      incident.status = 'UNASSIGNED';
      console.log('No ambulance available for this incident.');
    }
  } else {
    console.log('No incident this time step.');
  }
}

console.log('\nAll incidents created during the simulation:');
incidents.forEach((incident) => {
  console.log(`- ${incident.id}: status=${incident.status}, priority=${incident.priority}, coordinates=(${incident.latitude}, ${incident.longitude})`);
});
