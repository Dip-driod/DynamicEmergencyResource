class Incident {
  constructor({ id, priority, latitude, longitude }) {
    this.id = id;
    this.priority = priority;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

module.exports = { Incident };
