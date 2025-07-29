import React, { useEffect, useRef } from "react";
import "../styles/GlassCard.css";
import type { IconType } from "react-icons";

export interface GlassCardProps {
    children?: React.ReactNode;
    title?: string;
    icon?: IconType;
    isRaining?: boolean;
}

export default function GlassCard({
    children,
    title,
    icon,
    isRaining = false,
}: GlassCardProps) {
    const contentClassName = `glass-content-container-${title}`;

    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left; // px within the card
        const y = e.clientY - rect.top;
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
    };

    const handleMouseEnter = () => {
        cardRef.current?.style.setProperty("--o", "1");
    };

    const handleMouseLeave = () => {
        cardRef.current?.style.setProperty("--o", "0");
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.innerHTML = "";

        for (let i = 0; i < 10; i++) {
            const drop = document.createElement("div");
            drop.className = "drip-drop";
            drop.style.left = `${Math.random() * 90}%`;
            drop.style.animationDelay = `${Math.random() * 5}s`;
            drop.style.animationDuration = `${2 + Math.random() * 2}s`;
            drop.style.zIndex = `${Math.random() < 0.5 ? 0 : 1}`;
            drop.style.filter = `blur(${Math.random() * 1}px)`;

            container.appendChild(drop);
        }
    }, [isRaining]);

    return (
        <>
            <div
                className="glass-container shiny-card"
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="glass-title-container">
                    <div className="glass-icon-container">
                        {icon && React.createElement(icon)}
                    </div>
                    <p>{title}</p>
                </div>
                <div className={contentClassName} style={{ flex: 10 }}>
                    {children}
                </div>
                {isRaining && (
                    <div className="drip-container" ref={containerRef} />
                )}
            </div>
        </>
    );
}
