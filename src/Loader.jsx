// Loader.js
import { useEffect } from "react";
import gsap from "gsap";

export default function Loader({ finish, onComplete }) {
  useEffect(() => {
    // intro animation (does NOT call onComplete)
    const tl = gsap.timeline();
    tl.to(".loader-text", { opacity: 1, duration: 0.8, ease: "power2.inOut" })
      .to(".loader-bar", { width: "80%", duration: 1.6, ease: "power4.inOut" });
    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!finish) return;
    // exit animation when finish becomes true
    const tl = gsap.timeline({
      onComplete: () => {
        if (typeof onComplete === "function") onComplete();
      },
    });
    tl.to(".loader-bar", { width: "100%", duration: 0.6, ease: "power4.inOut" })
      .to(".loader", { y: "-100%", duration: 0.8, ease: "power4.inOut" }, "+=0.1");
    return () => tl.kill();
  }, [finish, onComplete]);

  return (
    <div className="loader fixed top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center z-50">
      <h1 className="loader-text text-white text-4xl opacity-0 mb-6">Loading...</h1>
      <div className="loader-bar bg-yellow-500 h-2 w-0 rounded-full"></div>
    </div>
  );
}
