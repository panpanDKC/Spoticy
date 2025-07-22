//import axios from "axios";
import { API_URL } from "../const";

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
    window.location.href = `${API_URL}/login`;
}
