/* eslint-disable */

export const mockSensors = {
    all: [
        {
            "id": 1,
            "area": {
                "id": 1,
                "isActive": true,
                "latitude": "41.3851",
                "longitude": "2.1734",
            },
            "type": "TestieHumid",
            "isActive": true
        },
        {
            "id": 2,
            "area": {
                "id": 1,
                "isActive": true,
                "latitude": "41.3851",
                "longitude": "2.1734",
            },
            "type": "TestieLight",
            "isActive": true
        },
        {
            "id": 3,
            "area": {
                "id": 2,
                "isActive": true,
                "latitude": "41.3851",
                "longitude": "2.1734",
            },
            "type": "TestieLight2",
            "isActive": true
        },
        {
            "id": 4,
            "area": {
                "id": 3,
                "isActive": true,
                "latitude": "41.3851",
                "longitude": "2.1734",
            },
            "type": "RemoveHumid",
            "isActive": true
        },
        {
            "id": 5,
            "area": {
                "id": 4,
                "isActive": true,
                "latitude": "41.3851",
                "longitude": "2.1734",
            },
            "type": "DarthHumid",
            "isActive": true
        },
        {
            "id": 6,
            "area": {
                "id": 4,
                "isActive": true,
                "latitude": "41.3851",
                "longitude": "2.1734",
            },
            "type": "DarthLight",
            "isActive": true
        }
    ],

      modifiedFirstLevel: {
        "id": 3,
        "type": "NowLatersSensor"
    },

      modifiedSecondLevel: {
        "id": 3,
        "area": {
            "id": 4,
            "isActive": true,
            "latitude": "41.3851",
            "longitude": "2.1734",
        },
        "type": "NowLatersSensor",
        "isActive": true
    },

    created: {
        "id": 7,
        "area": {
            "id": 2,
            "isActive": true,
            "latitude": "41.3851",
            "longitude": "2.1734",
        },
        "type": "TestiesNewSensor",
        "isActive": true
    },


}
