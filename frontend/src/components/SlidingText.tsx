import React, { useEffect, useRef, useState } from "react";
import "../styles/SlidingText.css";

interface SlidingTextProps {
    children: React.ReactNode;
}

const SlidingText: React.FC<SlidingTextProps> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [scrollAmount, setScrollAmount] = useState(0);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const text = textRef.current;

        if (container && text) {
            const containerWidth = container.offsetWidth;
            const textWidth = text.scrollWidth;

            const overflow = textWidth - containerWidth;

            if (overflow > 0) {
                setScrollAmount(overflow);
                setShouldAnimate(true);
            } else {
                setShouldAnimate(false);
            }
        }
    }, [children]);

    return (
        <div className="sliding-container" ref={containerRef}>
            <div
                className={`sliding-text ${shouldAnimate ? "animate" : ""}`}
                ref={textRef}
                style={
                    shouldAnimate
                        ? ({
                              "--scroll-distance": `-${scrollAmount}px`,
                          } as React.CSSProperties)
                        : undefined
                }
            >
                {children}
            </div>
        </div>
    );
};

export default SlidingText;
