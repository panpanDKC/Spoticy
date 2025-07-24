import express from "express";
import querystring from "querystring";
import axios from "axios";
import { CLIENT_ID, SCOPES, REDIRECT_URI, CLIENT_SECRET } from "../const.js";
import { clearTokens, saveTokens } from "../utils/token_file_handler.js";

const router = express.Router();

router.get("/login", (req, res) => {
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

router.post("/tokens", (req, res) => {
    const { access_token, refresh_token } = req.body;

    if (!access_token || !refresh_token) {
        return res
            .status(400)
            .send("Access token and refresh token are required");
    }

    try {
        saveTokens({
            access_token: access_token,
            refresh_token: refresh_token,
        });
        res.status(200).send("Tokens saved successfully");
    } catch (err) {
        console.error("Error saving tokens:", err);
        res.status(500).send("Error saving tokens");
    }
});

router.get("/logout", (req, res) => {
    try {
        clearTokens();
        res.status(200).send("Logged out successfully");
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).send("Error during logout");
    }
});

export default router;
