import React, { useEffect, useRef } from "react";
import "../styles/GlassCard.css";
import type { IconType } from "react-icons";

export interface GlassCardProps {
    children?: React.ReactNode;
    title?: string;
    icon?: IconType;
}

export default function GlassCard({ children, title, icon }: GlassCardProps) {
    const contentClassName = `glass-content-container-${title}`;

    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        const el = cardRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Distance from center (you could also use edge-based)
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Max distance threshold (from center to corner)
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

        // Invert and clamp: closer = stronger
        const intensity = Math.max(0, 1 - distance / maxDistance);

        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
        el.style.setProperty("--o", `${intensity}`); // use gradual glow
    };

    useEffect(() => {
        const onMove = (e: MouseEvent) => handleMouseMove(e);

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    const handleMouseEnter = () => {
        cardRef.current?.style.setProperty("--o", "1");
    };

    const handleMouseLeave = () => {
        cardRef.current?.style.setProperty("--o", "0");
    };

    return (
        <>
            <div
                className="glass-container shiny-card"
                ref={cardRef}
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
            </div>
        </>
    );
}
