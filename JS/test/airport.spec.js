const assert = require('chai').assert;

const MilitaryPlane = require('../src/components/Planes/MilitaryPlane/MilitaryPlane.js');
const PassengerPlane = require('../src/components/Planes/PassengerPlane/PassengerPlane.js');
const Airport = require('../src/components/Airport/Airport.js');
const MilitaryType = require('../src/models/MilitaryType.js');
const ExperimentalPlane = require('../src/components/Planes/ExperimentalPlane/ExperimentalPlane.js');
const ExperimentalTypes = require('../src/models/ExperimentalTypes.js');
const ClassificationLevel = require('../src/models/ClassificationLevel.js');

describe('Test Airport', () => {
  let planes = [
    new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
    new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
    new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
    new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
    new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
    new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
    new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
    new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
    new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryType.TYPE_BOMBER),
    new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryType.TYPE_BOMBER),
    new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.TYPE_BOMBER),
    new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryType.TYPE_FIGHTER),
    new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryType.TYPE_FIGHTER),
    new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.TYPE_TRANSPORT),
    new ExperimentalPlane("Bell X-14", 277, 482, 500, ExperimentalTypes.HIGH_ALTITUDE, ClassificationLevel.SECRET),
    new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalTypes.VTOL, ClassificationLevel.TOP_SECRET)
  ];
  let airport;

  beforeEach(() => {
    airport = new Airport(planes)
  })

  it('should have military Planes with transport type', () => {
    let militaryPlanesWithTransportType = [new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.TYPE_TRANSPORT)];
    assert.deepEqual(airport.getTransportMilitaryPlanes(), militaryPlanesWithTransportType);
  });

  it('should check passenger plane with max capacity', () => {
    let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);
    assert.deepEqual(airport.getPassengerPlaneWithMaxPassengersCapacity(), planeWithMaxPassengerCapacity);
  });

  it('should sort by max load capacity correct', () => {
    airport.sortByMaxLoadCapacity();
    let planesSortedByMaxLoadCapacity = airport.getPlanes();
    let nextPlaneMaxLoadCapacityIsHigherThanCurrent = true;
    for (let i = 0; i < planesSortedByMaxLoadCapacity.length - 1; i++) {
      let currentPlane = planesSortedByMaxLoadCapacity[i];
      let nextPlane = planesSortedByMaxLoadCapacity[i + 1];
      if (currentPlane.maxLoadCapacity > nextPlane.maxLoadCapacity) {
        nextPlaneMaxLoadCapacityIsHigherThanCurrent = false;
        break;
      }
    }
    assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanCurrent);
  })

  it('should don\'t have at least one military Planes expect bomber type', () => {
    airport.getBomberMilitaryPlanes().forEach((plane) => {
      assert.isTrue(plane.militaryType === MilitaryType.TYPE_BOMBER)
    })
  })

  it('should check that experimental planes has classification level higher than unclassified', () => {
    airport.getExperimentalPlanes().forEach((plane) => {
      assert.isTrue(plane.classificationLevel !== ClassificationLevel.UNCLASSIFIED)
    })
  });
});



