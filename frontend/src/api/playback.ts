import axios from "axios";
import { API_URL } from "../const";

export async function getPlaybackState() {
    try {
        const acc_token = localStorage.getItem("access_token");
        if (acc_token === undefined) return null;
        const resp = await axios.get(`${API_URL}/playback`, {
            headers: {
                Authorization: `Bearer ${acc_token}`,
            },
        });
        return resp.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getPlaybackNextTrack() {
    try {
        const acc_token = localStorage.getItem("access_token");
        if (acc_token === undefined) return null;
        const resp = await axios.get(`${API_URL}/playback/next`, {
            headers: {
                Authorization: `Bearer ${acc_token}`,
            },
        });
        return resp.status;
    } catch (err) {
        console.error(err);
    }
}

export async function getPlaybackPrevTrack() {
    try {
        const acc_token = localStorage.getItem("access_token");
        if (acc_token === undefined) return null;
        const resp = await axios.get(`${API_URL}/playback/prev`, {
            headers: {
                Authorization: `Bearer ${acc_token}`,
            },
        });
        return resp.status;
    } catch (err) {
        console.error(err);
    }
}

export async function getPlaybackPauseTrack() {
    try {
        const acc_token = localStorage.getItem("access_token");
        if (acc_token === undefined) return null;
        const resp = await axios.get(`${API_URL}/playback/pause`, {
            headers: {
                Authorization: `Bearer ${acc_token}`,
            },
        });
        return resp.status;
    } catch (err) {
        console.error(err);
    }
}

export async function getPlaybackResumeTrack() {
    try {
        const acc_token = localStorage.getItem("access_token");
        if (acc_token === undefined) return null;
        const resp = await axios.get(`${API_URL}/playback/resume`, {
            headers: {
                Authorization: `Bearer ${acc_token}`,
            },
        });
        return resp.status;
    } catch (err) {
        console.error(err);
    }
}
