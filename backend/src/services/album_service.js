import axios from "axios";
import { loadTokens } from "../utils/token_file_handler.js";
import { refreshToken } from "../utils/token_refresh.js";
import { filterAlbumtData } from "../models/album.js";

export async function getAlbumDetails(albumId) {
    const { access_token, refresh_token } = await loadTokens();
    try {
        const resp = await axios.get(
            `https://api.spotify.com/v1/albums/${albumId}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return filterAlbumtData(resp.data);
    } catch (err) {
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await getAlbumDetails(albumId); // Retry after refreshing token
        }
        console.log(err);
    }
}
