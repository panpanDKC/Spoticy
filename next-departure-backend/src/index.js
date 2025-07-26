import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 8889;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173", // or use "*" for all origins in dev
        credentials: true,
    })
);

import ratp_router from "./routes/ratpNextStop_routes.js";
app.use("/ratp", ratp_router);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
