import axios from "axios";
import { SPOTICY_API_URL } from "../const";

export async function connectSpotify() {
    // try {
    //     const resp = await axios.get(`${API_URL}/login`, {
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //     });
    //     console.log("resp:", resp);
    //     return resp.data;
    // } catch (err) {
    //     console.error(err);
    //     return err;
    // }
    window.location.href = `${SPOTICY_API_URL}/login`;
}

export async function saveTokens(access_token: string, refresh_token: string) {
    try {
        const resp = await axios.post(
            `${SPOTICY_API_URL}/tokens`,
            {
                access_token,
                refresh_token,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return resp.status;
    } catch (err) {
        console.error("Error saving tokens:", err);
        throw err;
    }
}

export async function logout() {
    try {
        const resp = await axios.get(`${SPOTICY_API_URL}/logout`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return resp.status;
    } catch (err) {
        console.error("Error during logout:", err);
        throw err;
    }
}
