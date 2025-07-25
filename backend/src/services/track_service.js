import axios from "axios";
import { loadTokens } from "../utils/token_file_handler.js";
import { refreshToken } from "../utils/token_refresh.js";

export async function getTrackDetails(trackId) {
    const { access_token, refresh_token } = await loadTokens();
    try {
        const resp = await axios.get(
            `https://api.spotify.com/v1/tracks/${trackId}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        return resp.data;
    } catch (err) {
        if (err.status === 401 || err.status === 403) {
            refreshToken(refresh_token);
            return await getTrackDetails(trackId); // Retry after refreshing token
        }
        console.log(err);
    }
}
