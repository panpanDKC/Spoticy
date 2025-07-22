import express from "express";
import { getTrackDetails } from "../services/track_service";

const router = express.Router();

router.get("/track/:trackId", async (req, res) => {
    const auth = req.headers.authorization;
    if (auth === undefined || !auth.includes(" "))
        return res.status(403).send("Must provide access_token");

    const { trackId } = req.params;
    const token = auth.split(" ")[1];
    const track = getTrackDetails(token, trackId);
    return res.send(track);
});
