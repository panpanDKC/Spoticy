import axios from "axios";

export async function getUserProfile(access_token) {
    try {
        const resp = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const user = {
            name: resp.data.display_name,
            mail: resp.data.email,
            country: resp.data.country,
            profile_pic:
                resp.data.images.length > 0 ? resp.data.images[0] : null,
        };
        return user;
    } catch (err) {
        console.log(err);
    }
}
