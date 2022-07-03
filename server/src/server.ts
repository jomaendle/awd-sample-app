import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import * as path from "path";
import { employeeRouter } from "./employee_routes";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  throw new Error("ATLAS_URI must be defined");
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    const apiRoute = "/.netlify/functions/server/employees";

    app.use(cors());

    // Add routes
    app.use(apiRoute, employeeRouter);

    // start Express server
    app.listen(5200, () => {
      console.log("Server started on port 5200!");
    });
  })
  .catch((err) => {
    console.error(err);
  });
