import express from "express";
import { getAlbumDetails } from "../services/album_service.js";

const router = express.Router();

router.get("/album/:id", async (req, res) => {
    const albumId = req.params.id;
    const resp = await getAlbumDetails(albumId);
    return res.send(resp);
});

export default router;
