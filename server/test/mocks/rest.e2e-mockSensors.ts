/* eslint-disable */

export const mockSensors =
[
  {
      "id": 1,
      "user": {
          "id": 1,
          "firstName": "Testie",
          "lastName": "Testov",
          "isActive": true
      },
      "sensors": [
          {
              "id": 2,
              "type": "TestieLight",
              "isActive": true
          },
          {
              "id": 1,
              "type": "TestieHumid",
              "isActive": true
          }
      ],
      "controllers": [
          {
              "id": 1,
              "type": "TestiePump",
              "isActive": true
          },
          {
              "id": 2,
              "type": "TestieMusic",
              "isActive": true
          }
      ],
      "isActive": true
  },
  {
      "id": 2,
      "user": {
          "id": 1,
          "firstName": "Testie",
          "lastName": "Testov",
          "isActive": true
      },
      "sensors": [
          {
              "id": 3,
              "type": "TestieLight2",
              "isActive": true
          }
      ],
      "controllers": [
          {
              "id": 3,
              "type": "TestieDoor",
              "isActive": true
          }
      ],
      "isActive": true
  },
  {
      "id": 3,
      "user": {
          "id": 2,
          "firstName": "Deletisek",
          "lastName": "Removo",
          "isActive": true
      },
      "sensors": [
          {
              "id": 4,
              "type": "RemoveHumid",
              "isActive": true
          }
      ],
      "controllers": [
          {
              "id": 4,
              "type": "RemovePump",
              "isActive": true
          }
      ],
      "isActive": true
  },
  {
      "id": 4,
      "user": {
          "id": 3,
          "firstName": "Darth",
          "lastName": "Later",
          "isActive": true
      },
      "sensors": [
          {
              "id": 6,
              "type": "DarthLight",
              "isActive": true
          },
          {
              "id": 5,
              "type": "DarthHumid",
              "isActive": true
          }
      ],
      "controllers": [
          {
              "id": 5,
              "type": "DarthDoor",
              "isActive": true
          },
          {
              "id": 6,
              "type": "DarthPump",
              "isActive": true
          }
      ],
      "isActive": true
  }
]