import express from "express";
import cors from "cors";
import "dotenv/config";
import https from "https";
import fs from "fs";

const app = express();
const port = 8889;

const options = {
    key: fs.readFileSync("../../server.key"),
    cert: fs.readFileSync("../../server.cert"),
};

app.use(express.json());
app.use(
    cors(
        {
            origin: "*",
            credentials: true, // or use "*" for all origins in dev
        },
        {
            origin: "https://192.168.68.100:5173",
            credentials: true, // or use "*" for all origins in dev
        }
    )
);

import ratp_router from "./routes/ratpNextStop_routes.js";
app.use("/ratp", ratp_router);

https.createServer(options, app).listen(port, function (req, res) {
    console.log(`Server listening on http://localhost:${port}`);
});
