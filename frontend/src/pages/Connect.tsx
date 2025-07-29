import "../styles/Connect.css";
import { connectSpotify, isAuthentified } from "../api/connect";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SPOTICY_HOME_URL } from "../const";

function Connect() {
    const navigate = useNavigate();

    useEffect(() => {
        const isConnected = async () => {
            const resp_status = await isAuthentified();
            console.log("try user resp_status:", resp_status);
            if (resp_status === 200) {
                navigate(SPOTICY_HOME_URL);
            }
        };
        isConnected();
    });

    const handleSpotifyClick = async () => {
        await connectSpotify();
    };

    return (
        <div className="page-content">
            <div>
                <img
                    src="/src/assets/spotify-logo.png"
                    id="spotify-logo"
                    onClick={handleSpotifyClick}
                />
                <p>
                    <strong>Connect through spotify</strong>
                </p>
            </div>
        </div>
    );
}

export default Connect;
