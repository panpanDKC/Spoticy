import axios from "axios";
import { API_URL } from "../const";

export async function getAlbumById(id: string) {
    try {
        const resp = await axios.get(`${API_URL}/album/${id}`);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
}
