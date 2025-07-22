import axios from "axios";
import { API_URL } from "../const";
import type { User } from "../models/user";

export async function getUserProfile() {
    try {
        const acc_token = localStorage.getItem("access_token");
        if (acc_token === undefined) return null;
        const resp = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${acc_token}`,
            },
        });
        console.log("user:", resp.data);
        return resp.data as User;
    } catch (err) {
        console.error(err);
    }
}
