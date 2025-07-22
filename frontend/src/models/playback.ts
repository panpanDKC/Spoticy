export interface IPlayback {
    device: string;
    is_playing: boolean;
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
}
