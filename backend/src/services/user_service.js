import axios from "axios";
import { filterQueueTrackData } from "../models/queueTrack.js";
import { loadTokens } from "../utils/token_file_handler.js";
import { refreshToken } from "../utils/token_refresh.js";
import { filterPlaylistData } from "../models/playlist.js";

export async function getUserProfile() {
    const { access_token, refresh_token } = await loadTokens();
    try {
        const resp = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        console.log("user_rep:", resp.data);

        const user = {
            name: resp.data.display_name,
            mail: resp.data.email,
            country: resp.data.country,
            profile_pic:
                resp.data.images.length > 0 ? resp.data.images[0] : null,
        };
        return user;
    } catch (err) {
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await getUserProfile(); // Retry after refreshing token
        }
        console.log(err);
    }
}

export async function getUserQueue() {
    const { access_token, refresh_token } = await loadTokens();
    try {
        const resp = await axios.get(
            "https://api.spotify.com/v1/me/player/queue",
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        return filterQueueTrackData(resp.data.queue);
    } catch (err) {
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await getUserQueue(); // Retry after refreshing token
        }
        console.log(err);
    }
}

export async function getUserLikedTracks() {
    const { access_token, refresh_token } = await loadTokens();
    try {
        const resp = await axios.get(
            "https://api.spotify.com/v1/me/tracks?limit=50",
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        console.log("liked resp", resp); // Debugging line
        return filterPlaylistData(resp.data.items);
    } catch (err) {
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await getUserLikedTracks(); // Retry after refreshing token
        }
        console.log(err);
    }
}

export async function isAuthentified() {
    const { access_token, refresh_token } = await loadTokens();
    try {
        const resp = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return resp.status === 200;
    } catch (err) {
        console.log(err);
    }
}
