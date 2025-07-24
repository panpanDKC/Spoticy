export function filterAlbumtData(album_data) {
    const queue = album_data.tracks.items.map((item) => {
        return filterItemData(item, album_data.images[0].url);
    });
    return queue;
}

function filterItemData(item_data, img) {
    let item = {
        id: item_data.id,
        name: item_data.name,
        uri: item_data.uri,
        picture: img,
        artists: [],
    };

    const artists = item_data.artists.map((a) => {
        return a.name;
    });
    item.artists = artists;
    return item;
}
