import { CLIENT_ID, CLIENT_SECRET } from "../const.js";
import { loadTokens } from "../utils/token_file_handler.js";
import axios from "axios";

export async function refreshAccessToken() {
    try {
        const { access_token, refresh_token } = loadTokens();
        const authOptions = {
            url: "https://accounts.spotify.com/api/token",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString(
                        "base64"
                    ),
            },
            form: {
                grant_type: "refresh_token",
                refresh_token: refresh_token,
            },
            json: true,
        };
        const response = await axios.post(authOptions.url, null, {
            headers: authOptions.headers,
            params: authOptions.form,
        });
        return response;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
}
