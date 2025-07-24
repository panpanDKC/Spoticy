import axios from "axios";
import express from "express";

import { getPlaylistDetails } from "../services/playlist_service.js";

const router = express.Router();

router.get("/playlists/:playlistId", async (req, res) => {
    const playlistId = req.params.playlistId;

    const playlistDetails = await getPlaylistDetails(playlistId);
    return res.send(playlistDetails);
});

export default router;
