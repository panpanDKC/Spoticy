import axios from "axios";
import { filterPlaylistData } from "../models/playlist.js";
import { loadTokens } from "../utils/token_file_handler.js";
import { refreshToken } from "../utils/token_refresh.js";

export async function getPlaylistDetails(playlistId) {
    const { access_token, refresh_token } = await loadTokens();
    try {
        const resp = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        return filterPlaylistData(resp.data.items);
    } catch (err) {
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await getPlaylistDetails(playlistId); // Retry after refreshing token
        }
        console.log(err);
    }
}
