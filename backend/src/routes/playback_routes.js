import axios from "axios";
import express from "express";
import {
    getPlaybackState,
    triggerNextTrack,
    triggerPauseTrack,
    triggerPrevTrack,
    triggerResumeTrack,
} from "../services/playback_service.js";

const router = express.Router();

router.get("/playback", async (req, res) => {
    const auth = req.headers.authorization;
    if (auth === undefined || !auth.includes(" "))
        return res.status(403).send("Must provide access_token");
    const token = auth.split(" ")[1];

    const playback = await getPlaybackState(token);
    return res.send(playback);
});

router.get("/playback/next", async (req, res) => {
    const auth = req.headers.authorization;
    if (auth === undefined || !auth.includes(" "))
        return res.status(403).send("Must provide access_token");
    const token = auth.split(" ")[1];

    const result = await triggerNextTrack(token);
    return res.status(result);
});

router.get("/playback/prev", async (req, res) => {
    const auth = req.headers.authorization;
    if (auth === undefined || !auth.includes(" "))
        return res.status(403).send("Must provide access_token");
    const token = auth.split(" ")[1];

    const result = await triggerPrevTrack(token);
    return res.status(result);
});

router.get("/playback/resume", async (req, res) => {
    const auth = req.headers.authorization;
    if (auth === undefined || !auth.includes(" "))
        return res.status(403).send("Must provide access_token");
    const token = auth.split(" ")[1];

    const result = await triggerResumeTrack(token);
    return res.status(result);
});

router.get("/playback/pause", async (req, res) => {
    const auth = req.headers.authorization;
    if (auth === undefined || !auth.includes(" "))
        return res.status(403).send("Must provide access_token");
    const token = auth.split(" ")[1];

    const result = await triggerPauseTrack(token);
    return res.status(result);
});

export default router;
