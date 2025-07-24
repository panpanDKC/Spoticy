import React from "react";
import "../styles/PlayingBars.css";

const PlayingBars: React.FC = () => {
    return (
        <div className="bars-container">
            <span className="bar bar1" />
            <span className="bar bar2" />
            <span className="bar bar3" />
        </div>
    );
};

export default PlayingBars;
