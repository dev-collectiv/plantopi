/* eslint-disable */

export const mockUserSeed = [
  {
    firstName: 'Testie',
    lastName: 'Testov',
    isActive: true
  },
  {
    firstName: 'Deletisek',
    lastName: 'Removo',
    isActive: true
  },
  {
    firstName: 'Darth',
    lastName: 'Later',
    isActive: true
  }
];

export const mockCronSeed = [
  {
    controllerId: '1',
    time: '5 * * * * *',
    action: { id: 'pump1', action: 'on', duration: '3' }
  },
  {
    controllerId: '2',
    time: '3 * * * * *',
    action: { id: 'pump1', action: 'on', duration: '5' }
  }
];

export const mockAreaSeed = [
  {
    user: 1,
    name: 'kek',
    isActive: true
  },
  {
    user: 1,
    name: 'keko',
    isActive: true
  },
  {
    user: 2,
    name: 'kek',
    isActive: true
  },
  {
    user: 3,
    name: 'kek',
    isActive: true
  }
];

export const mockSensorSeed = [
  {
    areaId: '1',
    type: 'TestieHumid'
  },
  {
    areaId: '1',
    type: 'TestieLight'
  },
  {
    areaId: '2',
    type: 'TestieLight2'
  },
  {
    areaId: '3',
    type: 'RemoveHumid'
  },
  {
    areaId: '4',
    type: 'DarthHumid'
  },
  {
    areaId: '4',
    type: 'DarthLight'
  }
];

export const mockControllerSeed = [
  {
    areaId: '1',
    type: 'TestiePump'
  },
  {
    areaId: '1',
    type: 'TestieMusic'
  },
  {
    areaId: '2',
    type: 'TestieDoor'
  },
  {
    areaId: '3',
    type: 'RemovePump'
  },
  {
    areaId: '4',
    type: 'DarthDoor'
  },
  {
    areaId: '4',
    type: 'DarthPump'
  }
];
