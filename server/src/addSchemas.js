import {fomodb} from './database.js'

fomodb.command({
    collMod: "fomoEvents",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["eventName", "start", 'end', "description", "tags", "societyName"],
            properties: {
                societyName: {
                    bsonType: "string"
                },
                eventName: {
                    bsonType: "string"
                },
                start: {
                    bsonType: "number",
                    description: "Epoch time in milliseconds"
                },
                end: {
                    bsonType: "number",
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
    validationAction: "error",
});

fomodb.command({
    collMod: "fomoSocieties",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["societyName", "admins", "users"],
            properties: {
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
    validationAction: "error",
});

fomodb.command({
    collMod: "fomoUsers",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "password", "salt", "societies", "tags", "refreshToken"],
            properties: {
                username: {
                    bsonType: "string"
                },
                password: {
                    bsonType: "string",
                    description: "Must be encrypted"
                },
                email: {
                    bsonType: "string"
                },
                salt: {
                    bsonType: "string"
                },
                societies: {
                    bsonType: "array"
                },
                tags: {
                    bsonType: "array"
                },
                refreshToken: {
                    bsonType: "string"
                }
            }
        }
    },
    validationAction: "error",
});

console.log('finished');