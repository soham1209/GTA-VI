import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

import "./App.css";

export default function Hero() {
  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 90,
      duration: 1,
      ease: "power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 16,
      duration: 3,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });
  useGSAP(() => {
    if (!showContent) {
      return;
    }
    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / innerWidth - 0.5) * 40;
      gsap.to(".imagediv .text", {
        x: `${xMove * 0.2}%`,
      });
      gsap.to(".sky ", {
        x: `${xMove}%`,
      });
      gsap.to(".bg", {
        x: `${xMove * 0.2}%`,
      });
    });
    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: "Expo.easeInOut",
    });
    gsap.to(".sky", {
      scale: 1.4,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });
    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".char", {
      top: 10,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".logo", {
      top: 250,
      duration: 2,
      ease: "Expo.easeInOut",
    });

    gsap.to(".brbar", {
      bottom: 80,
      duration: 2,
      ease: "Expo.easeInOut",
    });

    gsap.to(".theft", {
      marginLeft: 500,
      duration: 2,
      ease: "Expo.easeInOut",
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex justify-center items-center top-0 left-0 z-[2] w-full h-screen overflow-hidden bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="400"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          ></image>
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing w-full h-screen bg-black bg-">
            <div className="navbar absolute top-0 left-0 w-full py-2 px-6 z-20 ">
              <div className="logo flex gap-2 mt-2">
                <div className="lines flex flex-col gap-1">
                  <div className="line bg-white w-12 h-2"></div>
                  <div className="line bg-white w-8 h-2"></div>
                  <div className="line bg-white w-4 h-2"></div>
                </div>
                <h3 className="text-4xl text-white -mt-2 leading-none">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagediv relative  w-full h-screen overflow-hidden">
              <img
                className="sky absolute top-0 left-0 w-full h-full object-cover  scale-x-[1.9] rotate-20"
                src="./sky.png"
                alt="sky"
              />
              <img
                className="bg absolute top-0 left-0 w-full h-full object-cover scale-[1.5] rotate-10"
                src="./bg.png"
                alt="bg"
              />
              <div className="text flex flex-col gap-6 top-0 left-1/2 -translate-x-1/2 text-white text-[10rem]  absolute  ">
                <h1 className="grand ml-0 leading-none">grand</h1>
                <h1 className="theft ml-0 leading-none">theft</h1>
                <h1 className="auto ml-20 leading-none">auto</h1>
              </div>
              <img
                className="char absolute top-150 left-1/2 -translate-x-1/2"
                src="./girlbg.png"
                alt="girl"
              />
              <img
                className="logo absolute top-140 right-60 scale-[.3]"
                src="./logo18.png"
                alt="girl"
              />
            </div>
            <div className="brbar relative bottom-0 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="brbr absolute inset-0">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-4 text-white text-2xl items-center">
                  <i className="ri-arrow-down-line"></i>
                  <h3 className="font-[Helvetica_Now_Display]">Scroll Down</h3>
                </div>
                <img
                  className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-25"
                  src="./ps5.png"
                  alt="PS5"
                />
              </div>
            </div>
          </div>
          <div className="about flex justify-center items-center w-full h-screen px-10 bg-black overflow-hidden">
            <div className="cntnr flex w-full h-full text-white ">
              <div className="limg relative w-1/2 h-full ">
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt="2nd girl"
                />
              </div>
              <div className="rg mt-12 w-1/2">
                <h1 className="text-8xl">Still Running,</h1>
                <h1 className="text-8xl">Not Hunting</h1>
                <p className=" text-2xl mt-12 font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Minus repudiandae error eligendi aperiam ullam accusantium est
                  ducimus corrupti iste, quaerat odio saepe culpa illum, fuga at
                  quos. Minima, laborum iusto!
                </p>
                <p className=" text-2xl mt-6 font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente veritatis nam et. Dolore expedita reprehenderit
                  tempore, nobis illo odit neque voluptate ipsa amet consectetur
                  doloremque nostrum praesentium veritatis tempora quas.
                </p>
                <button className="text-2xl text-black bg-yellow-500 px-10 py-2 mt-10 rounded hover:bg-yellow-300 ease-in-out duration-400">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
