class Resource {
  constructor({
    id,
    latitude,
    longitude,
    status = 'AVAILABLE',
    assignedIncidentId = null
  }) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.status = status;
    this.assignedIncidentId = assignedIncidentId;
  }
}

module.exports = { Resource };