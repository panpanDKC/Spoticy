import { useEffect, useState } from "react";
import { getUserProfile } from "../api/user";
import type { User, UserImage } from "../models/user";
import "../styles/Home.css";
import Playback from "../components/Playback";
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [IsLoading, setIsLoading] = useState(true);

    const [userName, setUserName] = useState("");
    const [userMail, setUserMail] = useState("");
    const [userCountry, setUserCountry] = useState("");

    const default_user_image = { height: 300, url: "empty", width: 300 };
    const [userProfilePic, setUserProfilePic] =
        useState<UserImage>(default_user_image);

    const setUserProfile = (user_profile: User) => {
        setUserName(user_profile.name);
        setUserMail(user_profile.mail);
        setUserCountry(user_profile.country);
        setUserProfilePic(user_profile.profile_pic);
    };

    const handleFetchError = () => {
        return (
            <div>
                <h1> Failed to fetch your spotify datas, try again.</h1>
            </div>
        );
    };

    const handleQuit = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/");
    };

    useEffect(() => {
        async function fecthData() {
            const user = await getUserProfile();
            if (user === null || user === undefined) {
                return handleFetchError();
            }
            setUserProfile(user);
            setIsLoading(false);
        }
        fecthData();
    }, []);

    if (IsLoading) {
        return;
    }

    return (
        <div className="page">
            <div className="page-content">
                <div className="top-items">
                    <div className="user-card">
                        <img
                            src={userProfilePic.url}
                            alt={userProfilePic.url}
                            className="user-profile-picture"
                        />
                        <div className="user-card-details">
                            <p>{userName}</p>
                            <p>{userMail}</p>
                            <p>{userCountry}</p>
                        </div>
                    </div>
                    <button className="quit-btn" onClick={handleQuit}>
                        <FaPowerOff className="quit-btn-label" />
                    </button>
                </div>
                <div className="playback-div">
                    <div id="playback-simulator">
                        <Playback></Playback>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
