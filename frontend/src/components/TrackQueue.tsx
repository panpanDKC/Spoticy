import { useEffect, useState } from "react";
import { type IQueueTrack } from "../models/queueTrack";
import "../styles/TrackQueue.css";
import { getPlaylistById } from "../api/playlist";
import type { IPlayback } from "../models/playback";
import PlayingBars from "./PlayingBars";
import { getPlaybackResumeTrack } from "../api/playback";
import { getLikedTracks } from "../api/user";
import { getAlbumById } from "../api/album";

export default function TrackQueue({
    playback_state,
}: {
    playback_state?: IPlayback | null;
}) {
    const [tracks, setTracks] = useState<IQueueTrack[]>([]);

    // Simulate fetching tracks from an API or state management

    useEffect(() => {
        const getTrackQueue = async () => {
            const context_uri_tmp = playback_state?.context_uri?.split(":");
            console.log("context_uri_tmp", context_uri_tmp);

            if (context_uri_tmp && context_uri_tmp[1] === "playlist") {
                const songs = await getPlaylistById(context_uri_tmp[2] || "");
                setTracks(songs);
                return;
            }

            if (context_uri_tmp && context_uri_tmp[1] === "album") {
                const songs = await getAlbumById(context_uri_tmp[2] || "");
                setTracks(songs);
                return;
            }

            if (context_uri_tmp && context_uri_tmp[1] === "user") {
                const songs = await getLikedTracks();
                setTracks(songs);
                return;
            }
        };

        const fetchTracks = async () => {
            try {
                await getTrackQueue();
            } catch (err) {
                console.error("Error fetching user queue:", err);
                return;
            }
        };

        // Simulate fetching tracks when the component mounts
        if (!playback_state?.context_uri) {
            console.warn("No context URI provided, skipping track fetch.");
            return;
        }
        fetchTracks();
    }, [playback_state?.context_uri]);

    const handleTrackClick = async (pos: number) => {
        if (!playback_state?.context_uri) return;

        try {
            const resp = await getPlaybackResumeTrack(
                playback_state.context_uri,
                pos
            );
            if (resp === null) {
                console.error("Failed to play track");
                return;
            }
        } catch (err) {
            console.error("Error resuming playback:", err);
        }
    };

    return (
        <div className="track-queue">
            <div className="track-queue-header">
                <h2>Track Queue</h2>
            </div>
            <div className="track-queue-list">
                {tracks.length > 0 ? (
                    tracks.map((track: IQueueTrack, index: number) => (
                        <div
                            key={index}
                            className="track-item"
                            onClick={() => handleTrackClick(index)}
                        >
                            <div
                                className="item-left"
                                style={
                                    playback_state?.track?.id === track.id
                                        ? { color: "#5dd465" }
                                        : {}
                                }
                            >
                                <img
                                    src={track.picture}
                                    alt={track.name}
                                    className="track-queue-image"
                                />
                                <div className="track-queue-details">
                                    <p className="track-queue-name">
                                        {track.name}
                                    </p>
                                    <p className="track-queue-artists">
                                        {track.artists?.join(", ")}
                                    </p>
                                </div>
                            </div>
                            {playback_state?.track?.id === track.id && (
                                <div className="track-queue-playing-bars">
                                    <PlayingBars />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No tracks in the queue</p>
                )}
            </div>
        </div>
    );
}
