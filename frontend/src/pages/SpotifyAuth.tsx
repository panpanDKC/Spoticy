// src/pages/SpotifyAuth.tsx or inside your router
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveTokens } from "../api/connect";
import { SPOTICY_CONNECT_URL, SPOTICY_HOME_URL } from "../const";

export default function SpotifyAuth() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const sendTokens = async (
            acc_token: string | null,
            ref_token: string | null
        ) => {
            if (!acc_token || !ref_token) {
                console.error("Access token or refresh token is missing");
                navigate(SPOTICY_CONNECT_URL);
                return;
            }

            console.log("before tokens");
            const status = await saveTokens(acc_token, ref_token);
            console.log("after tokens:", status);
            if (status === 200) {
                navigate(SPOTICY_HOME_URL);
            } else {
                console.error("Failed to save tokens");
                navigate(SPOTICY_CONNECT_URL);
            }
        };

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        sendTokens(access_token, refresh_token);
    });

    return <div>Logging you in with Spotify...</div>;
}
