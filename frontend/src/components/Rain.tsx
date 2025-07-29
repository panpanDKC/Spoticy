import React, { useEffect } from "react";
import "../styles/Rain.css";

const Rain: React.FC = () => {
    const makeItRain = () => {
        const frontRow = document.querySelector(".rain.front-row");
        const backRow = document.querySelector(".rain.back-row");

        if (frontRow) frontRow.innerHTML = "";
        if (backRow) backRow.innerHTML = "";

        let increment = 0;
        let drops = "";
        let backDrops = "";

        while (increment < 100) {
            const randoHundo = Math.floor(Math.random() * 98) + 1;
            const randoFiver = Math.floor(Math.random() * 4) + 2;
            increment += randoFiver;

            const dropStyle = `left: ${increment}%; bottom: ${
                randoFiver + randoFiver - 1 + 100
            }%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;`;

            const stemStyle = `animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;`;

            const drop = `
        <div class="drop" style="${dropStyle}">
          <div class="stem" style="${stemStyle}"></div>
          <div class="splat" style="${stemStyle}"></div>
        </div>
      `;

            const backDrop = `
        <div class="drop" style="right: ${increment}%; bottom: ${
                randoFiver + randoFiver - 1 + 100
            }%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;">
          <div class="stem" style="${stemStyle}"></div>
          <div class="splat" style="${stemStyle}"></div>
        </div>
      `;

            drops += drop;
            backDrops += backDrop;
        }

        if (frontRow) frontRow.innerHTML = drops;
        if (backRow) backRow.innerHTML = backDrops;
    };

    useEffect(() => {
        makeItRain();
    }, []);

    return (
        <div className={"back-row-toggle"}>
            <div className="rain front-row"></div>
            <div className="rain back-row"></div>
        </div>
    );
};

export default Rain;
