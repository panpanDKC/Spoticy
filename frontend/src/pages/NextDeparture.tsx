import { useEffect, useState } from "react";
import "../styles/NextDeparture.css";
import type { INextDeparture } from "../models/next_departure";
import { getNextDeparture } from "../api/next-departure";

function NextDeparture() {
    const [nextDeparture, setNextDeparture] = useState<INextDeparture>();

    useEffect(() => {
        async function fetchNextDeparture() {
            try {
                const response = await getNextDeparture();
                setNextDeparture(response);
            } catch (error) {
                console.error("Error fetching next departure:", error);
            }
        }
        fetchNextDeparture();

        const interval = setInterval(fetchNextDeparture, 60000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleBlinkingText = () => {
            const departure_text = document.querySelector(
                ".departure-timestamp"
            );

            const currentTime = new Date();

            const departureTimeStr =
                nextDeparture?.next_stop.expected_departure;
            console.log(departureTimeStr);
            if (!departureTimeStr) return;
            const [hours, minutes] = departureTimeStr.split(":").map(Number);
            const now = new Date();
            const departureTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                hours,
                minutes,
                0,
                0
            );
            const timeDifference =
                departureTime.getTime() - currentTime.getTime();
            console.log(
                `Current time: ${currentTime}, Departure time: ${departureTime}, Difference: ${timeDifference} ms`
            );
            if (timeDifference <= 420000) {
                // 7 minutes in milliseconds
                departure_text?.classList.add("blinking");
            } else {
                departure_text?.classList.remove("blinking");
            }
        };
        handleBlinkingText();
    }, [nextDeparture]);

    return (
        <div className="next-departure-page">
            <div className="departure-container">
                <div className="departure">
                    <div className="station-dest-container">
                        <p className="station-name">
                            {nextDeparture?.next_stop.station_name}
                        </p>
                        <p className="destination-name">
                            vers{" "}
                            {nextDeparture?.following_stop.destination_name}
                        </p>
                    </div>
                    <div className="departure-details">
                        <div className="departure-line">
                            <p className="departure-line-label">B</p>
                        </div>
                        <div className="timestamp-container">
                            <p className="departure-timestamp">
                                {nextDeparture?.next_stop.expected_departure}
                            </p>
                            <div className="next-departure-container">
                                <p className="next-departure-label">
                                    Prochain départ
                                </p>
                                <p className="next-departure-time">
                                    {
                                        nextDeparture?.following_stop
                                            .expected_departure
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NextDeparture;
