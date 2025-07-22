import express from "express";
import querystring from "querystring";
import axios from "axios";
import { CLIENT_ID, SCOPES, REDIRECT_URI, CLIENT_SECRET } from "../const.js";

const router = express.Router();

router.get("/login", (req, res) => {
    console.log("/login reached");
    const params = querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI,
    });

    res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});

router.get("/refresh", async (req, res) => {
    const refreshToken = req.headers.authorization;
    const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
        {
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(
                        process.env.SPOTIFY_CLIENT_ID +
                            ":" +
                            process.env.SPOTIFY_CLIENT_SECRET
                    ).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
});

router.get("/callback", async (req, res) => {
    const code = req.query.code || null;

    if (!code) {
        return res.status(400).send("No code provided");
    }

    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            querystring.stringify({
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
            }),
            {
                headers: {
                    Authorization:
                        "Basic " +
                        Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString(
                            "base64"
                        ),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token, refresh_token } = response.data;

        res.redirect(
            `http://localhost:5173/spotify-auth?access_token=${access_token}&refresh_token=${refresh_token}`
        );
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).send("Error retrieving access token");
    }
});

export default router;
