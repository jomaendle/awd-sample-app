import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const employeeRouter = express.Router();
employeeRouter.use(express.json());

employeeRouter.get("/", async (req, res) => {
    try {
        const employees = await collections.employees.find({}).toArray();
        res.status(200).send(employees);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

employeeRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const employee = await collections.employees.findOne(query);

        if (!employee) {
            res.status(404).send(`Employee not found: ID: ${id}`);
        } else {
            res.status(200).send(employee);
        }
    } catch (err) {
        res.status(404).send(`Failed to find employee: ${req?.params.id}`);
    }
})

employeeRouter.post("/", async (req, res) => {
    try {
        const employee = req.body;
        const result = await collections.employees.insertOne(employee);

        if (result.acknowledged) {
            res.status(201).send(`Created new employee: ${result.insertedId}`);
        } else {
            res.status(500).send("Failed to create employee");
        }
    } catch (e) {
        console.error(e);
        res.status(400).send(e.message);
    }


})