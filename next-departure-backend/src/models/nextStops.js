export function filterNextStopsData(next_stops_data) {
    const stops =
        next_stops_data?.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0]
            ?.MonitoredStopVisit || [];

    const filtered_stops = stops.filter((stop) => {
        return stop?.MonitoredVehicleJourney?.DirectionRef.value === "Retour";
    });

    const getStopInfo = (index) => {
        return {
            station_name:
                filtered_stops[index]?.MonitoredVehicleJourney?.MonitoredCall
                    ?.StopPointName[0]?.value || null,
            destination_name:
                filtered_stops[index]?.MonitoredVehicleJourney
                    ?.DestinationName[0]?.value || null,
            expected_departure:
                filtered_stops[index]?.MonitoredVehicleJourney?.MonitoredCall
                    ?.AimedDepartureTime || null,
        };
    };

    const next_stops = {
        next_stop: getStopInfo(0),
        following_stop: getStopInfo(1),
    };
    return addTwoHour(next_stops);
}

function addTwoHour(next_stops) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    next_stops.next_stop.expected_departure = formatDate(
        next_stops.next_stop.expected_departure
    );
    next_stops.following_stop.expected_departure = formatDate(
        next_stops.following_stop.expected_departure
    );

    return next_stops;
}
