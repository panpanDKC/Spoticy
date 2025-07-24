export interface IPlayback {
    device: string;
    is_playing: boolean;
    context_uri?: string;
    track: {
        name: string;
        progress: number;
        duration: number;
        picture: {
            width: number;
            height: number;
            url: string;
        };
        artists: string[];
        id: string;
    };
    repeat_mode: "off" | "context" | "track";
    shuffle: boolean;
}
