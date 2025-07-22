import axios from "axios";
import { filterPlaybackData } from "../models/playback.js";

export async function getPlaybackState(access_token) {
    try {
        const resp = await axios.get("https://api.spotify.com/v1/me/player", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const playback_info = filterPlaybackData(resp.data, access_token);
        return playback_info;
    } catch (err) {
        console.log(err);
    }
}

export async function triggerNextTrack(access_token) {
    try {
        const resp = await axios.post(
            "https://api.spotify.com/v1/me/player/next",
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return resp.status;
    } catch (err) {
        console.log(err);
    }
}

export async function triggerPrevTrack(access_token) {
    try {
        const resp = await axios.post(
            "https://api.spotify.com/v1/me/player/previous",
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return resp.status;
    } catch (err) {
        console.log(err);
    }
}

export async function triggerResumeTrack(access_token) {
    try {
        const resp = await axios.put(
            "https://api.spotify.com/v1/me/player/play",
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return resp.status;
    } catch (err) {
        console.log(err);
    }
}

export async function triggerPauseTrack(access_token) {
    try {
        const resp = await axios.put(
            "https://api.spotify.com/v1/me/player/pause",
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return resp.status;
    } catch (err) {
        console.log(err);
    }
}
