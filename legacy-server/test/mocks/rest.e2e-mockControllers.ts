/* eslint-disable */

export const mockControllers = {
    all: [
        {
            "id": 1,
            "area": {
                "id": 1,
                "isActive": true,
                "latitude": "41.3851",
                "longitude": "2.1734",
            },
            "type": "TestiePump",
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
            "type": "TestieMusic",
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
            "type": "TestieDoor",
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
            "type": "RemovePump",
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
            "type": "DarthDoor",
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
            "type": "DarthPump",
            "isActive": true
        }
      ],

      modifiedFirstLevel: {
        "id": 3,
        "type": "NowLatersDoor"
    },

      modifiedSecondLevel: {
        "id": 3,
        "area": {
            "id": 4,
            "isActive": true,
            "latitude": "41.3851",
            "longitude": "2.1734",
        },
        "type": "NowLatersDoor",
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
        "type": "TestiesNewDoor",
        "isActive": true
    },


}
