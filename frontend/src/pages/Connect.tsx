import "../styles/Connect.css";
import { connectSpotify } from "../api/connect";

function Connect() {
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
