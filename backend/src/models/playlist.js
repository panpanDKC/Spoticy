export function filterPlaylistData(playlist_data) {
    const queue = playlist_data.map((item) => {
        return filterItemData(item);
    });
    return queue;
}

function filterItemData(item_data) {
    let item = {
        id: item_data.track.id,
        name: item_data.track.name,
        uri: item_data.track.uri,
        picture: item_data.track.album.images[0].url,
        artists: [],
    };

    const artists = item_data.track.artists.map((a) => {
        return a.name;
    });
    item.artists = artists;
    return item;
}
