import axios from "axios";
import { SPOTICY_API_URL } from "../const";

export async function getPlaylistById(id: string) {
    try {
        const resp = await axios.get(`${SPOTICY_API_URL}/playlists/${id}`);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
}
