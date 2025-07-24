import axios from "axios";
import express from "express";
import {
    getUserProfile,
    getUserQueue,
    getUserLikedTracks,
} from "../services/user_service.js";

const router = express.Router();

router.get("/user", async (req, res) => {
    const user_profile = await getUserProfile();
    return res.send(user_profile);
});

router.get("/user/queue", async (req, res) => {
    const user_queue = await getUserQueue();
    return res.send(user_queue);
});

router.get("/user/liked", async (req, res) => {
    const user_liked_tracks = await getUserLikedTracks();
    return res.send(user_liked_tracks);
});

export default router;
