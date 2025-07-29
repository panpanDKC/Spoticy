import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 8887;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173", // or use "*" for all origins in dev
        credentials: true,
    })
);

import weather_routes from "./routes/weather_routes.js";
app.use(weather_routes);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
