import * as mongodb from 'mongodb';
import {Employee} from "./employee";

export const collections: {
    employees?: mongodb.Collection<Employee>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("meanStackExample");
    await applySchemaValidation(db);

    collections.employees = db.collection<Employee>("employees");
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' must be a string and is required"
                },
                position: {
                    bsonType: "string",
                    description: "'position' must be a string and is required",
                    minLength: 5,
                },
                level: {
                    bsonType: "string",
                    description: "'level' must be a string and is required",
                    enum: ["JUNIOR", "MIDDLE", "SENIOR"]
                }
            }
        }
    };

    await db.command({
        collMod: "employees",
        validator: jsonSchema
    }).catch(async (err: mongodb.MongoServerError) => {
        if (err.codeName === "NamespaceNotFound") {
            await db.createCollection("employees", {
                validator: jsonSchema
            });
        }
    })
}