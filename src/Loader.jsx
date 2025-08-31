import React, { useEffect } from "react";
import { gsap } from "gsap";

export default function Loader({ finish, onComplete }) {
  useEffect(() => {
    const tlIntro = gsap.timeline();
    tlIntro.to(".loader", { autoAlpha: 1, duration: 1, ease: "expo.inOut" });

    const tlContent = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });
    tlContent
      .fromTo(
        ".loader-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, ease:'expo.inOut' }
      )
      .to(
        ".loader-bar",
        { width: "80%", duration: 2, ease: "expo.inOut" },
        "-=0.8"
      );

    return () => {
      tlIntro.kill();
      tlContent.kill();
    };
  }, []);

  useEffect(() => {
    if (!finish) return;

    // Exit animation when finish becomes true
    const tlExit = gsap.timeline({
      onComplete: () => {
        if (typeof onComplete === "function") {
          onComplete();
        }
      },
    });

    tlExit
      .to(".loader-bar", { width: "100%", duration: 0, ease: "power4.inOut" })
      .to(
        ".loader",
        { autoAlpha: 0, duration: .8, ease: "power4.inOut" },
        "+=0.2"
      );

    return () => tlExit.kill();
  }, [finish, onComplete]);

  return (
    <div className="loader fixed inset-0 bg-black h-screen flex flex-col justify-center items-center z-50 opacity-0">
      <h1
        className="loader-text text-white text-4xl mb-6 font-sans tracking-wide"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
      >
        Loading...
      </h1>
      <div className="loader-bar h-2 w-0 bg-yellow-500 rounded-full shadow-lg"></div>
    </div>
  );
}
