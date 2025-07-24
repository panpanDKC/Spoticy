import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 8888;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173", // or use "*" for all origins in dev
        credentials: true,
    })
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

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
