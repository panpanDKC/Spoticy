import { useRef, useEffect } from "react";
import "../styles/Card3D.css";

export interface Card3DProps {
    image: string;
}

export default function Card3D({ image }: Card3DProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const boundsRef = useRef<DOMRect | null>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseEnter = () => {
            boundsRef.current = card.getBoundingClientRect();
            document.addEventListener("mousemove", rotateToMouse);
        };

        const handleMouseLeave = () => {
            document.removeEventListener("mousemove", rotateToMouse);
            card.style.transform = "";
            const glow = card.querySelector(".glow") as HTMLElement;
            if (glow) glow.style.backgroundImage = "";
        };

        const rotateToMouse = (e: MouseEvent) => {
            if (!boundsRef.current || !cardRef.current) return;

            const card = cardRef.current;
            const { x, y, width, height } = boundsRef.current;

            const mouseX = e.clientX - x;
            const mouseY = e.clientY - y;

            const centerX = width / 2;
            const centerY = height / 2;

            // Normalized cursor position (-1 to 1)
            const percentX = (mouseX - centerX) / centerX;
            const percentY = (mouseY - centerY) / centerY;

            const maxTilt = 15; // degrees

            const rotateX = percentY * maxTilt;
            const rotateY = percentX * -maxTilt;

            card.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale3d(1.05, 1.05, 1.05)
  `;

            // Glow follows cursor with stronger contrast
            const glow = card.querySelector(".glow") as HTMLElement;
            if (glow) {
                glow.style.backgroundImage = `
      radial-gradient(
        circle at ${mouseX}px ${mouseY}px,
        rgba(255, 255, 255, 0.3),
        #0000000f
      )
    `;
            }
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mousemove", rotateToMouse);
        };
    }, []);

    return (
        <div
            className="card"
            ref={cardRef}
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="glow" />
        </div>
    );
}
