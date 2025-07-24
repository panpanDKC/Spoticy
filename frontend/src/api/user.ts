import axios from "axios";
import { API_URL } from "../const";
import type { User } from "../models/user";

export async function getUserProfile() {
    try {
        const resp = await axios.get(`${API_URL}/user`);
        return resp.data as User;
    } catch (err) {
        console.error(err);
    }
}

export async function getUserQueue() {
    try {
        const resp = await axios.get(`${API_URL}/user/queue`);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getLikedTracks() {
    try {
        const resp = await axios.get(`${API_URL}/user/liked`);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
}
