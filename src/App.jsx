// App.js
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Hero from "./Hero";
import "./App.css";

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    // resolve on load or error (so a broken image doesn't hang forever)
    img.onload = () => resolve({ src, ok: true });
    img.onerror = () => resolve({ src, ok: false });
  });
}

function App() {
  const [loading, setLoading] = useState(true);      // whether we show Loader component
  const [finishLoader, setFinishLoader] = useState(false); // when Loader should play exit
  const MIN_LOADER_MS = 1200; // guarantee loader visible for min time

  useEffect(() => {
    // list all hero images (use the same public paths you use in Hero)
    const images = [
      "/sky.png",
      "/bg.png",
      "/girlbg.png",
      "/logo18.png",
      "/ps5.png",
      "/imag.png",
      // add any more hero images here
    ];

    const start = performance.now();

    // create preload promises
    const promises = images.map((src) => preloadImage(src));

    // wait for all preloads OR a timeout fallback (e.g., 6s) to avoid infinite wait
    const all = Promise.all(promises);
    const timeout = new Promise((resolve) => setTimeout(resolve, 6000));

    Promise.race([Promise.all([all, timeout]).then(() => {}), all])
      .then(() => {
        const elapsed = performance.now() - start;
        const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
        // Wait remaining time to guarantee minimum loader visibility
        setTimeout(() => {
          // Signal Loader to play exit animation
          setFinishLoader(true);
        }, remaining);
      })
      .catch(() => {
        // on unexpected error, still proceed to exit loader
        setFinishLoader(true);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader
          finish={finishLoader}
          onComplete={() => {
            // hide loader only after exit animation completes
            setLoading(false);
          }}
        />
      ) : (
        <Hero />
      )}
    </>
  );
}

export default App;
