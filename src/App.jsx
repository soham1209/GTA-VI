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
  const [loading, setLoading] = useState(true);      
  const [finishLoader, setFinishLoader] = useState(false); 
  const MIN_LOADER_MS = 1000; 
  useEffect(() => {
    const images = [
      "/sky.png",
      "/bg.png",
      "/girlbg.png",
      "/logo18.png",
      "/ps5.png",
      "/imag.png",
      "/fonts/pricedown.woff2"
    ];

    const start = performance.now();

    const promises = images.map((src) => preloadImage(src));

    const all = Promise.all(promises);
    const timeout = new Promise((resolve) => setTimeout(resolve, 7000));

    Promise.race([Promise.all([all, timeout]).then(() => {}), all])
      .then(() => {
        const elapsed = performance.now() - start;
        const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
        
        setTimeout(() => {
          setFinishLoader(true);
        }, remaining);
      })
      .catch(() => {
        setFinishLoader(true);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader
          finish={finishLoader}
          onComplete={() => {
           
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
