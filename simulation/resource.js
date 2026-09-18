class Resource {
  constructor({ id, latitude, longitude, status = 'AVAILABLE' }) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.status = status;
  }
}

module.exports = { Resource };
