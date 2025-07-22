// src/pages/SpotifyAuth.tsx or inside your router
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SpotifyAuth() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (access_token && refresh_token) {
            // Save to localStorage
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);

            // Redirect to home or profile page
            navigate("/home");
        } else {
            console.error("Missing tokens");
        }
    });

    return <div>Logging you in with Spotify...</div>;
}
