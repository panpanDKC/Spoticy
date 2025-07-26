import express from "express";
import { getNextStop } from "../services/ratpNextStop_service.js";

const router = express.Router();

router.get("/next-stop", async (req, res) => {
    const resp = await getNextStop();
    return res.send(resp);
});

export default router;
