const PassengerPlane = require('../Planes/PassengerPlane/PassengerPlane.js');
const MilitaryPlane = require('../Planes/MilitaryPlane/MilitaryPlane.js');
const MilitaryType = require('../../models/militaryType.js');
const ExperimentalPlane = require('../planes/ExperimentalPlane/ExperimentalPlane.js');

class Airport {
  constructor (planes) {
    this.planes = planes;
  }

  getPlanes () {
    return this.planes;
  }

  static print (planes) {
    return JSON.stringify(planes);
  }

  getPassengerPlanes () {
    return this.planes.filter((plane) => plane instanceof PassengerPlane);
  }

  getMilitaryPlanes () {
      return this.planes.filter((plane) => plane instanceof MilitaryPlane);
  }

  getExperimentalPlanes () {
    return this.planes.filter((plane) => plane instanceof ExperimentalPlane);
  }

  getPassengerPlaneWithMaxPassengersCapacity () {
    return this.getPassengerPlanes().reduce((acc, curr) => acc.passengersCapacity > curr.passengersCapacity ? acc : curr);
  }

  getTransportMilitaryPlanes () {
    return this.getMilitaryPlanes().filter((plane) => plane.militaryType == MilitaryType.TYPE_TRANSPORT);
  }

  getBomberMilitaryPlanes () {
    return this.getMilitaryPlanes().filter((plane) => plane.militaryType === MilitaryType.TYPE_BOMBER);
  }

  sortByMaxDistance () {
    this.planes.sort((a, b) => (a.maxFlightDistance > b.maxFlightDistance) ? 1 : -1);
    return this;
  }

  sortByMaxSpeed () {
    this.planes.sort((a, b) => (a.maxSpeed > b.maxSpeed) ? 1 : -1);
    return this;
  }

  sortByMaxLoadCapacity () {
    this.planes.sort((a, b) => (a.maxLoadCapacity > b.maxLoadCapacity) ? 1 : -1);
    return this;
  }
}

module.exports = Airport;
