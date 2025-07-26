import axios from "axios";
import { filterNextStopsData } from "../models/nextStops.js";

export async function getNextStop() {
    try {
        const response = await axios.get(
            "https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=STIF%3AStopArea%3ASP%3A46007%3A&LineRef=STIF%3ALine%3A%3AC01743%3A",
            {
                headers: {
                    apiKey: "fFBCBd4EjmuotYd9xwwrim8y5e6rc6mL",
                },
            }
        );
        return filterNextStopsData(response.data);
    } catch (error) {
        console.error("Error fetching next stop:", error);
        throw error;
    }
}
