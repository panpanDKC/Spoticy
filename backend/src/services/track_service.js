import axios from "axios";

export async function getTrackDetails(access_token, trackId) {
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
        console.log(err);
    }
}
