// Loader.js
import { useEffect } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete, // callback when loader finishes
    });

    tl.to(".loader-text", {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    })
      .to(".loader-bar", {
        width: "100%",
        duration: 2,
        ease: "power4.inOut",
      })
      .to(".loader", {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
      });
  }, [onComplete]);

  return (
    <div className="loader fixed top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center z-50">
      <h1 className="loader-text text-white text-4xl opacity-0 mb-6">
        Loading...
      </h1>
      <div className="loader-bar bg-yellow-500 h-2 w-0 rounded-full"></div>
    </div>
  );
}
