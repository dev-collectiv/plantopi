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
    controller: '5',
    time: '5 * * * * *',
    action: { id: 'pump1', action: 'on', duration: '3' }
  },
  {
    controller: '2',
    time: '3 * * * * *',
    action: { id: 'pump1', action: 'on', duration: '5' }
  }
];

export const mockAreaSeed = [
  {
    user: 1,
    isActive: true
  },
  {
    user: 1,
    isActive: true
  },
  {
    user: 2,
    isActive: true
  },
  {
    user: 3,
    isActive: true
  }
];

export const mockSensorSeed = [
  {
    area: 1,
    type: 'TestieHumid'
  },
  {
    area: 1,
    type: 'TestieLight'
  },
  {
    area: 2,
    type: 'TestieLight2'
  },
  {
    area: 3,
    type: 'RemoveHumid'
  },
  {
    area: 4,
    type: 'DarthHumid'
  },
  {
    area: 4,
    type: 'DarthLight'
  }
];

export const mockControllerSeed = [
  {
    area: 1,
    type: 'TestiePump'
  },
  {
    area: 1,
    type: 'TestieMusic'
  },
  {
    area: 2,
    type: 'TestieDoor'
  },
  {
    area: 3,
    type: 'RemovePump'
  },
  {
    area: 4,
    type: 'DarthDoor'
  },
  {
    area: 4,
    type: 'DarthPump'
  }
];
