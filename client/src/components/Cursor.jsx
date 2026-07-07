import React, { useEffect, useState } from "react";
import pencil from "../assets/pencil.png";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="hidded lg:fixed pointer-events-none z-9999 w-10 h-10 bg-contain bg-no-repeat"
      style={{
        backgroundImage: `url(${pencil})`,
        left: position.x,
        top: position.y
      }}
    />
  );
};

export default Cursor;