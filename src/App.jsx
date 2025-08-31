import { useEffect, useState } from "react";
import Loader from "./Loader";

import "./App.css";
import Hero from "./Hero";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    let loadedCount = 0;
    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === images.length) setLoading(false);
        });
      }
    });

    if (images.length === 0) setLoading(false);
  }, []);

  return (
    <>{loading ? <Loader onComplete={() => setLoading(false)} /> : <Hero />}</>
  );
}

export default App;
