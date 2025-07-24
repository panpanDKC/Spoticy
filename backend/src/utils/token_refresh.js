import { refreshAccessToken } from "../services/token_service.js";
import { saveTokens } from "./token_file_handler.js";

export async function refreshToken(refreshToken) {
    try {
        const response = await refreshAccessToken(refreshToken);
        if (response.status !== 200) {
            throw new Error("Failed to refresh token");
        }

        const { access_token, refresh_token } = response.data;
        if (!refresh_token) {
            saveTokens({
                access_token: access_token,
                refresh_token: refreshToken,
            });
        } else {
            saveTokens({
                access_token: access_token,
                refresh_token: refresh_token,
            });
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
}
