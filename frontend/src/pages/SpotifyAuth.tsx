// src/pages/SpotifyAuth.tsx or inside your router
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveTokens } from "../api/connect";

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
                navigate("/");
                return;
            }
            const status = await saveTokens(acc_token, ref_token);
            if (status === 200) {
                navigate("/home");
            } else {
                console.error("Failed to save tokens");
                navigate("/");
            }
        };

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        sendTokens(access_token, refresh_token);
    });

    return <div>Logging you in with Spotify...</div>;
}
