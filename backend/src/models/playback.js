import { getTrackDetails } from "../services/track_service.js";

export async function filterPlaybackData(playback_data, access_token) {
    let playback = {
        device: playback_data.device.name,
        is_playing: playback_data.is_playing,
        track: {
            name: playback_data.item.name,
            progress: playback_data.progress_ms,
            duration: playback_data.item.duration_ms,
            picture: playback_data.item.album.images[0],
            artists: [],
            id: playback_data.item.id,
        },
    };

    const artists = playback_data.item.album.artists.map((a) => {
        return a.name;
    });
    playback.track.artists = artists;
    return playback;
    //const track = await getTrackDetails(access_token, playback.track.id);
}
