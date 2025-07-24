import axios from "axios";
import { filterPlaybackData } from "../models/playback.js";
import { loadTokens } from "../utils/token_file_handler.js";
import { refreshToken } from "../utils/token_refresh.js";

export async function getPlaybackState() {
    const { access_token, refresh_token } = await loadTokens();
    try {
        const resp = await axios.get("https://api.spotify.com/v1/me/player", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const playback_info = filterPlaybackData(resp.data, access_token);
        return playback_info;
    } catch (err) {
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await getPlaybackState(); // Retry after refreshing token
        }
        console.log(err);
    }
}

export async function triggerNextTrack() {
    const { access_token, refresh_token } = await loadTokens();
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
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await triggerNextTrack(); // Retry after refreshing token
        }
        console.log(err);
    }
}

export async function triggerPrevTrack() {
    const { access_token, refresh_token } = await loadTokens();
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
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await triggerPrevTrack(); // Retry after refreshing token
        }
        console.log(err);
    }
}

export async function triggerResumeTrack(context_uri = null, offset = 0) {
    const { access_token, refresh_token } = await loadTokens();
    try {
        let body = {};
        if (context_uri !== null) {
            body = {
                context_uri: context_uri,
                offset: {
                    position: offset,
                },
            };
        }
        const resp = await axios.put(
            "https://api.spotify.com/v1/me/player/play",
            body,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        return resp.status;
    } catch (err) {
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await triggerResumeTrack(context_uri, offset); // Retry after refreshing token
        }
        console.log(err);
    }
}

export async function triggerPauseTrack() {
    const { access_token, refresh_token } = await loadTokens();
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
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await triggerPauseTrack(); // Retry after refreshing token
        }
        console.log(err);
    }
}

export async function toggleShuffle(shuffle) {
    const { access_token, refresh_token } = await loadTokens();
    try {
        const resp = await axios.put(
            `https://api.spotify.com/v1/me/player/shuffle?state=${shuffle}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        return resp.status;
    } catch (err) {
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await toggleShuffle(shuffle); // Retry after refreshing token
        }
        console.log(err);
    }
}

export async function toggleRepeat(repeatState) {
    const { access_token, refresh_token } = await loadTokens();
    try {
        const resp = await axios.put(
            `https://api.spotify.com/v1/me/player/repeat?state=${repeatState}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        return resp.status;
    } catch (err) {
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await toggleRepeat(repeatState); // Retry after refreshing token
        }
        console.log(err);
    }
}
