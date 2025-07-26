export interface INextDeparture {
    next_stop: {
        station_name: string;
        destination_name: string;
        expected_departure: string;
    };
    following_stop: {
        station_name: string;
        destination_name: string;
        expected_departure: string;
    };
}
