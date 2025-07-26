import axios from "axios";
import { NEXT_DEPARTURE_API_URL } from "../const";
import type { INextDeparture } from "../models/next_departure";

export async function getNextDeparture() {
    try {
        const resp = await axios.get(
            `${NEXT_DEPARTURE_API_URL}/ratp/next-stop`
        );
        return resp.data as INextDeparture;
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error for further handling if needed
    }
}
