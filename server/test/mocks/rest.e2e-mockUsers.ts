/* eslint-disable */

export const mockUsers = {
    all: [
        {
            "id": 1,
            "firstName": "Testie",
            "lastName": "Testov",
            "areas": [
                {
                    "id": 1,
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
                }
            ],
            "isActive": true
        },
        {
            "id": 2,
            "firstName": "Deletisek",
            "lastName": "Removo",
            "areas": [
                {
                    "id": 3,
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
                }
            ],
            "isActive": true
        },
        {
            "id": 3,
            "firstName": "Darth",
            "lastName": "Later",
            "areas": [
                {
                    "id": 4,
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
            ],
            "isActive": true
        }
    ],

    modified: {
        "id": 2,
        "firstName": "Deletoff",
        "lastName": "Updatiano",
        "isActive": false
    },

    created: {
        "id": 4,
        "firstName": "Phoenix",
        "lastName": "Resurrectsson",
        "isActive": true,
        "areas": []
    },

    afterDelete:[
        {
            "id": 1,
            "firstName": "Testie",
            "lastName": "Testov",
            "areas": [
                {
                    "id": 1,
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
                }
            ],
            "isActive": true
        },
        {
            "id": 3,
            "firstName": "Darth",
            "lastName": "Later",
            "areas": [
                {
                    "id": 4,
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
            ],
            "isActive": true
        }
    ]
}
