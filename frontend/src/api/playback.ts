import axios from "axios";
import { API_URL } from "../const";

export async function getPlaybackState() {
    try {
        const resp = await axios.get(`${API_URL}/playback`);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getPlaybackNextTrack() {
    try {
        const resp = await axios.get(`${API_URL}/playback/next`);
        return resp.status;
    } catch (err) {
        console.error(err);
    }
}

export async function getPlaybackPrevTrack() {
    try {
        const resp = await axios.get(`${API_URL}/playback/prev`);
        return resp.status;
    } catch (err) {
        console.error(err);
    }
}

export async function getPlaybackPauseTrack() {
    try {
        const resp = await axios.get(`${API_URL}/playback/pause`);
        return resp.status;
    } catch (err) {
        console.error(err);
    }
}

export async function getPlaybackResumeTrack(
    context_uri: string | null = null,
    offset: number = 0
) {
    try {
        const resp = await axios.post(`${API_URL}/playback/resume`, {
            context_uri: context_uri,
            offset: offset,
        });
        return resp.status;
    } catch (err) {
        console.error(err);
    }
}

export async function toggleShuffle(shuffle: boolean) {
    try {
        const resp = await axios.put(`${API_URL}/playback/shuffle`, {
            shuffle: shuffle,
        });
        return resp;
    } catch (err) {
        console.error(err);
    }
}

export async function toggleRepeat(repeat: "off" | "context" | "track") {
    try {
        const resp = await axios.put(`${API_URL}/playback/repeat`, {
            state: repeat,
        });
        return resp.status;
    } catch (err) {
        console.error(err);
    }
}
