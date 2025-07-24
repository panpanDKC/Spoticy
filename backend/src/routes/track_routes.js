import express from "express";
import { getTrackDetails } from "../services/track_service";

const router = express.Router();

router.get("/track/:trackId", async (req, res) => {
    const { trackId } = req.params;
    const track = getTrackDetails(trackId);
    return res.send(track);
});
