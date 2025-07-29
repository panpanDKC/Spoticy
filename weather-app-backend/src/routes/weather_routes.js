import express from "express";
import { getWeather } from "../services/weather_service.js";

const router = express.Router();

router.get("/weather", async (req, res) => {
    const params = {
        lat: req.query.lat,
        lng: req.query.lng,
        period: req.query.period,
        date: req.query.date,
    };

    const resp = await getWeather(
        params.lat,
        params.lng,
        params.period,
        params.date
    );
    return res.send(resp);
});

export default router;
