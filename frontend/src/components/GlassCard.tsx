import React from "react";
import "../styles/GlassCard.css";
import type { IconType } from "react-icons";

export interface GlassCardProps {
    children?: React.ReactNode;
    title?: string;
    icon?: IconType;
}

export default function GlassCard({ children, title, icon }: GlassCardProps) {
    const contentClassName = `glass-content-container-${title}`;
    return (
        <div className="glass-container">
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
    );
}
