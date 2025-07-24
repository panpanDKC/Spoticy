export interface IQueueTrack {
    id: string;
    uri: string;
    name: string;
    artists: string[];
    picture: string;
}

export const defaultQueueTrack: IQueueTrack = {
    id: "",
    uri: "",
    name: "Unknown Track",
    artists: ["Unknown Artist"],
    picture: "https://via.placeholder.com/150",
};
