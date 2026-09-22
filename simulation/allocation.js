function calculateDistance(resource, incident) {
  const earthRadiusKm = 6371;

  const latitude1 = resource.latitude * Math.PI / 180;
  const latitude2 = incident.latitude * Math.PI / 180;

  const latitudeDifference =
    (incident.latitude - resource.latitude) * Math.PI / 180;

  const longitudeDifference =
    (incident.longitude - resource.longitude) * Math.PI / 180;

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(latitude1) *
    Math.cos(latitude2) *
    Math.sin(longitudeDifference / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

function findClosestAvailableResource(incident, resources) {
  const availableResources = resources.filter(
    (resource) => resource.status === 'AVAILABLE'
  );

  if (availableResources.length === 0) {
    return null;
  }

  let closestResource = availableResources[0];
  let closestDistance = calculateDistance(
    closestResource,
    incident
  );

  for (let i = 1; i < availableResources.length; i++) {
    const resource = availableResources[i];

    const distance = calculateDistance(resource, incident);

    if (distance < closestDistance) {
      closestResource = resource;
      closestDistance = distance;
    }
  }

  return closestResource;
}
function getPriorityValue(priority) {
  const priorityValues = {
    CRITICAL: 4,
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1
  };

  return priorityValues[priority] || 0;
}
function getHighestPriorityIncident(incidents) {
  const pendingIncidents = incidents.filter(
    (incident) => incident.status === 'PENDING' || incident.status === 'UNASSIGNED'
  );

  if (pendingIncidents.length === 0) {
    return null;
  }

  let highestPriorityIncident = pendingIncidents[0];

  for (let i = 1; i < pendingIncidents.length; i++) {
    const incident = pendingIncidents[i];

    if (
      getPriorityValue(incident.priority) >
      getPriorityValue(highestPriorityIncident.priority)
    ) {
      highestPriorityIncident = incident;
    }
  }

  return highestPriorityIncident;
}
function allocateResource(incidents, resources) {
  const incident = getHighestPriorityIncident(incidents);

  if (!incident) {
    return null;
  }

  const resource = findClosestAvailableResource(
    incident,
    resources
  );

  if (!resource) {
    return null;
  }

  resource.status = 'BUSY';
  resource.assignedIncidentId = incident.id;

  incident.status = 'ASSIGNED';

  return {
    incident,
    resource,
    distance: calculateDistance(resource, incident)
  };
}

module.exports = {
  calculateDistance,
  findClosestAvailableResource,
  getPriorityValue,
  getHighestPriorityIncident,
  allocateResource
};