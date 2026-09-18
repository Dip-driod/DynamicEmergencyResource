const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const INCIDENT_PROBABILITY = 0.7;

let incidents = [];
let ambulances = [];

function createAmbulances() {
  return [
    {
      id: 'AMB-101',
      latitude: 40.7128,
      longitude: -74.006,
      status: 'AVAILABLE',
      currentAssignment: 'None'
    },
    {
      id: 'AMB-202',
      latitude: 40.7306,
      longitude: -73.9352,
      status: 'AVAILABLE',
      currentAssignment: 'None'
    },
    {
      id: 'AMB-303',
      latitude: 40.6892,
      longitude: -74.0445,
      status: 'AVAILABLE',
      currentAssignment: 'None'
    }
  ];
}

function createIncident() {
  const incidentId = `INC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const priority = PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)];
  const latitude = Number((Math.random() * (90 - (-90)) + (-90)).toFixed(4));
  const longitude = Number((Math.random() * (180 - (-180)) + (-180)).toFixed(4));

  return {
    id: incidentId,
    priority,
    latitude,
    longitude,
    status: 'PENDING',
    assignedAmbulance: 'None'
  };
}

function assignIncidentToAmbulance(incident) {
  const availableAmbulance = ambulances.find((ambulance) => ambulance.status === 'AVAILABLE');

  if (!availableAmbulance) {
    incident.status = 'UNASSIGNED';
    incident.assignedAmbulance = 'None';
    return;
  }

  availableAmbulance.status = 'BUSY';
  availableAmbulance.currentAssignment = incident.id;
  incident.status = 'ASSIGNED';
  incident.assignedAmbulance = availableAmbulance.id;
}

function runSingleSimulationStep() {
  const randomValue = Math.random();

  if (randomValue < INCIDENT_PROBABILITY) {
    const incident = createIncident();
    incidents.push(incident);
    assignIncidentToAmbulance(incident);
  }

  renderDashboard();
}

function resetSimulation() {
  incidents = [];
  ambulances = createAmbulances();
  renderDashboard();
}

function getStatusClass(status) {
  const lowerStatus = status.toLowerCase();

  if (lowerStatus === 'assigned') return 'status-assigned';
  if (lowerStatus === 'unassigned') return 'status-unassigned';
  if (lowerStatus === 'pending') return 'status-pending';
  if (lowerStatus === 'available') return 'status-available';
  if (lowerStatus === 'busy') return 'status-busy';

  return '';
}

function renderSummary() {
  const totalIncidents = incidents.length;
  const assignedIncidents = incidents.filter((incident) => incident.status === 'ASSIGNED').length;
  const unassignedIncidents = incidents.filter((incident) => incident.status === 'UNASSIGNED').length;
  const availableAmbulances = ambulances.filter((ambulance) => ambulance.status === 'AVAILABLE').length;
  const busyAmbulances = ambulances.filter((ambulance) => ambulance.status === 'BUSY').length;

  document.getElementById('totalIncidents').textContent = totalIncidents;
  document.getElementById('assignedIncidents').textContent = assignedIncidents;
  document.getElementById('unassignedIncidents').textContent = unassignedIncidents;
  document.getElementById('availableAmbulances').textContent = availableAmbulances;
  document.getElementById('busyAmbulances').textContent = busyAmbulances;
}

function renderIncidentTable() {
  const tableBody = document.getElementById('incidentTableBody');

  tableBody.innerHTML = incidents
    .map(
      (incident) => `
        <tr>
          <td>${incident.id}</td>
          <td>${incident.priority}</td>
          <td>${incident.latitude}</td>
          <td>${incident.longitude}</td>
          <td><span class="status-badge ${getStatusClass(incident.status)}">${incident.status}</span></td>
          <td>${incident.assignedAmbulance}</td>
        </tr>
      `
    )
    .join('');
}

function renderAmbulanceTable() {
  const tableBody = document.getElementById('ambulanceTableBody');

  tableBody.innerHTML = ambulances
    .map(
      (ambulance) => `
        <tr>
          <td>${ambulance.id}</td>
          <td>${ambulance.latitude}</td>
          <td>${ambulance.longitude}</td>
          <td><span class="status-badge ${getStatusClass(ambulance.status)}">${ambulance.status}</span></td>
          <td>${ambulance.currentAssignment}</td>
        </tr>
      `
    )
    .join('');
}

function renderDashboard() {
  renderSummary();
  renderIncidentTable();
  renderAmbulanceTable();
}

function initializeDashboard() {
  ambulances = createAmbulances();
  incidents = [];
  renderDashboard();

  document.getElementById('runSimulationBtn').addEventListener('click', () => {
    runSingleSimulationStep();
  });

  document.getElementById('resetSimulationBtn').addEventListener('click', () => {
    resetSimulation();
  });
}

initializeDashboard();
