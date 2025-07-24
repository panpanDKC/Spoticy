import express from "express";
import {
    getPlaybackState,
    toggleRepeat,
    toggleShuffle,
    triggerNextTrack,
    triggerPauseTrack,
    triggerPrevTrack,
    triggerResumeTrack,
} from "../services/playback_service.js";

const router = express.Router();

router.get("/playback", async (req, res) => {
    const playback = await getPlaybackState();
    return res.send(playback);
});

router.get("/playback/next", async (req, res) => {
    const result = await triggerNextTrack();
    return res.status(result);
});

router.get("/playback/prev", async (req, res) => {
    const result = await triggerPrevTrack();
    return res.status(result);
});

router.post("/playback/resume", async (req, res) => {
    const context_uri = req.body.context_uri || null;
    const offset = req.body.offset || 0;

    const result = await triggerResumeTrack(context_uri, offset);
    return res.status(result);
});

router.get("/playback/pause", async (req, res) => {
    const result = await triggerPauseTrack();
    return res.status(result);
});

router.put("/playback/shuffle", async (req, res) => {
    const shuffle = req.body.shuffle;

    const resp = await toggleShuffle(shuffle);
    if (!resp) {
        return res.status(500).send("Failed to toggle shuffle");
    }
    return res.status(resp);
});

router.put("/playback/repeat", async (req, res) => {
    const repeatState = req.body.state;

    const resp = await toggleRepeat(repeatState);
    if (!resp) {
        return res.status(500).send("Failed to toggle repeat");
    }
    return res.status(resp);
});

export default router;
