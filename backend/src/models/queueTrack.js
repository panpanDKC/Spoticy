export function filterQueueTrackData(queue_track_data) {
    const queue = queue_track_data.map((track) => {
        return filterTrackData(track);
    });
    return queue;
}

function filterTrackData(track_data) {
    let track = {
        name: track_data.name,
        uri: track_data.uri,
        picture: track_data.album.images[0].url,
        artists: [],
    };

    const artists = track_data.artists.map((a) => {
        return a.name;
    });
    track.artists = artists;
    return track;
}
