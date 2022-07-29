import {fomodb} from './database.js'

fomodb.command({
    collMod: "fomoEvents",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["societyId", "eventId", "eventName", "time", "description", "tags"],
            properties: {
                societyId: {
                    bsonType: "int"
                },
                eventId: {
                    bsonType: "int"
                },
                eventName: {
                    bsonType: "string"
                },
                time: {
                    bsonType: "int",
                    description: "Epoch time in milliseconds"
                },
                description: {
                    bsonType: "string"
                },
                tags: {
                    bsonType: "array",
                    description: "possible tags are: networking, workshops, social, free food, alcohol, excursion, online, in-person, sports, education"
                }
            }
        }
    },
    validationAction: "warn"
});

fomodb.command({
    collMod: "fomoSocieties",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["societyId", "societyName", "admins", "users"],
            properties: {
                societyId: {
                    bsonType: "int"
                },
                societyName: {
                    bsonType: "string"
                },
                admins: {
                    bsonType: "array",
                    description: "Array of user ids that have admin perms (can add/remove events, add/remove other admins. add/remove other users)"
                },
                users: {
                    bsonType: "array",
                    description: "Array of user ids that have basic perms (can add/remove events)"
                }
            }
        }
    },
    validationAction: "warn"
});

fomodb.command({
    collMod: "fomoUsers",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "password", "salt", "society"],
            properties: {
                userId: {
                    bsonType: "int"
                },
                username: {
                    bsonType: "string"
                },
                password: {
                    bsonType: "string",
                    description: "Must be encrypted"
                },
                salt: {
                    bsonType: "string"
                },
                societies: {
                    bsonType: "array"
                }
            }
        }
    },
    validationAction: "warn"
});