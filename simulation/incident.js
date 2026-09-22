class Incident {
  constructor({
    id,
    priority,
    latitude,
    longitude,
    arrivalTime = 0,
    status = 'UNASSIGNED'
  }) {
    this.id = id;
    this.priority = priority;
    this.latitude = latitude;
    this.longitude = longitude;
    this.arrivalTime = arrivalTime;
    this.status = status;
  }
}

module.exports = { Incident };