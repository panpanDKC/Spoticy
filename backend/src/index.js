import express from "express";
import cors from "cors";
import "dotenv/config";
import https from "https";
import fs from "fs";

const app = express();
const port = 8888;

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

import auth_router from "./routes/auth_routes.js";
app.use(auth_router);

import user_router from "./routes/user_routes.js";
app.use(user_router);

import playback_router from "./routes/playback_routes.js";
app.use(playback_router);

import playlist_router from "./routes/playlist_routes.js";
app.use(playlist_router);

import album_router from "./routes/album_routes.js";
app.use(album_router);

app.get("/test", async (req, res) => {
    return res.status(200).send("Ntm");
});

https.createServer(options, app).listen(port, function (req, res) {
    console.log(`Server listening on http://localhost:${port}`);
});
