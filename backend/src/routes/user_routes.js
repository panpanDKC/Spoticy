import axios from "axios";
import express from "express";
import { getUserProfile } from "../services/user_service.js";

const router = express.Router();

router.get("/user", async (req, res) => {
    const auth = req.headers.authorization;
    if (auth === undefined || !auth.includes(" "))
        return res.status(403).send("Must provide access_token");

    const token = auth.split(" ")[1];
    const user_profile = await getUserProfile(token);
    return res.send(user_profile);
});

export default router;
