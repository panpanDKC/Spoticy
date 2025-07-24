import React, { useEffect, useState } from "react";
import {
    TbPlayerTrackPrevFilled,
    TbPlayerTrackNextFilled,
    TbPlayerPauseFilled,
    TbPlayerPlayFilled,
    TbRepeat,
    TbRepeatOnce,
    TbRepeatOff,
    TbArrowsShuffle,
    TbArrowsRight,
} from "react-icons/tb";
import type { IPlayback } from "../models/playback";
import {
    getPlaybackNextTrack,
    getPlaybackPauseTrack,
    getPlaybackPrevTrack,
    getPlaybackResumeTrack,
    getPlaybackState,
    toggleRepeat,
    toggleShuffle,
} from "../api/playback";
import "../styles/Playback.css";
import SlidingText from "./SlidingText";
import Card3D from "./Card3D";

export default function Playback({
    setPlayback,
}: {
    setPlayback?: React.Dispatch<React.SetStateAction<IPlayback | null>>;
}) {
    const [playbackData, setPlaybackData] = useState<IPlayback>();
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchPlayback = async () => {
            try {
                const playback_state = await getPlaybackState();
                setPlaybackData(playback_state);
                setPlayback?.(playback_state);
                setIsPaused(!playback_state.is_playing);
                setProgress(playback_state.track?.progress || 0);
            } catch (error) {
                console.error("Error fetching playback:", error);
            }
        };

        // Fetch immediately on mount
        fetchPlayback();

        // Poll every 5 seconds
        const interval = setInterval(fetchPlayback, 5000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

    // Simulate progress ticking every second
    useEffect(() => {
        if (!playbackData?.is_playing) return;

        const tick = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + 1000;
                return newProgress < playbackData.track.duration
                    ? newProgress
                    : playbackData.track.duration;
            });
        }, 1000);

        return () => clearInterval(tick);
    }, [playbackData?.is_playing, playbackData?.track?.duration]);

    const formatMs = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const progressPercent = playbackData
        ? (progress / playbackData.track.duration) * 100
        : 0;

    const handlePlaybackPause = async () => {
        if (isPaused) {
            if ((await getPlaybackResumeTrack()) === 200) setIsPaused(false);
        } else {
            if ((await getPlaybackPauseTrack()) === 200) setIsPaused(true);
        }
    };

    const handleToggleRepeat = async () => {
        const newRepeatMode =
            playbackData?.repeat_mode === "off"
                ? "context"
                : playbackData?.repeat_mode === "context"
                ? "track"
                : "off";
        await toggleRepeat(newRepeatMode);
    };

    const handleRepeatModeIcon = () => {
        if (playbackData?.repeat_mode === "off") {
            return <TbRepeatOff />;
        } else if (playbackData?.repeat_mode === "context") {
            return <TbRepeat />;
        } else if (playbackData?.repeat_mode === "track") {
            return <TbRepeatOnce />;
        }
        return null;
    };

    const handleToggleShuffle = async () => {
        await toggleShuffle(!playbackData?.shuffle);
    };

    const handleShuffleIcon = () => {
        if (playbackData?.shuffle) return <TbArrowsShuffle />;
        return <TbArrowsRight />;
    };

    return (
        <div
            className="background-image"
            style={{
                backgroundImage: "url(" + playbackData?.track.picture.url + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="playback-container">
                {playbackData ? (
                    <div className="playback-content">
                        <div className="track-image">
                            <Card3D image={playbackData.track.picture.url} />
                        </div>
                        <div className="track-details">
                            <div className="sliding-track-name">
                                <SlidingText>
                                    <p className="track-name">
                                        <strong>
                                            {playbackData.track?.name}
                                        </strong>
                                    </p>
                                </SlidingText>
                            </div>
                            <p className="track-artist">
                                {playbackData.track?.artists?.join(", ")}
                            </p>
                            <div className="time-container">
                                <span>{formatMs(progress)}</span>
                                <div className="empty-bar">
                                    <div
                                        style={{
                                            width: `${progressPercent}%`,
                                        }}
                                        className="full-bar"
                                    />
                                </div>
                                <span>
                                    {formatMs(playbackData.track.duration)}
                                </span>
                            </div>
                            <div className="track-controls">
                                <div className="control">
                                    <button
                                        className="control-btn-mini"
                                        onClick={handleToggleShuffle}
                                    >
                                        {handleShuffleIcon()}
                                    </button>
                                </div>
                                <div className="control">
                                    <button
                                        className="control-btn"
                                        onClick={getPlaybackPrevTrack}
                                    >
                                        <TbPlayerTrackPrevFilled />
                                    </button>
                                </div>
                                <div className="control">
                                    <button
                                        className="control-btn"
                                        onClick={handlePlaybackPause}
                                    >
                                        {isPaused ? (
                                            <TbPlayerPlayFilled />
                                        ) : (
                                            <TbPlayerPauseFilled />
                                        )}
                                    </button>
                                </div>
                                <div className="control">
                                    <button
                                        className="control-btn"
                                        onClick={getPlaybackNextTrack}
                                    >
                                        <TbPlayerTrackNextFilled />
                                    </button>
                                </div>
                                <div className="control">
                                    <button
                                        className="control-btn-mini"
                                        onClick={handleToggleRepeat}
                                    >
                                        {handleRepeatModeIcon()}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading playback...</p>
                )}
            </div>
        </div>
    );
}
