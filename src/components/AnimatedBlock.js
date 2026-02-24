import "./AnimatedBlock.css";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

function AnimatedBlock() {
  const [animatedImages, setAnimatedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAnimated() {
      const db = getFirestore();
      const snap = await getDocs(collection(db, "images"));
      const all = snap.docs.map(doc => doc.data());

      // Filter for "animated" tag
      const filtered = all.filter(
        img => Array.isArray(img.tags) && img.tags.some(t => String(t).toLowerCase() === "animated")
      );

      // Take first 4
      setAnimatedImages(filtered.slice(0, 4));
    }
    fetchAnimated();
  }, []);

  const handleMoreClick = () => {
    navigate("/gallery?tag=animated");
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="animated-cont">
        <div className="animated-title">ANIMATED</div>

        <div className="animated-img">
          {animatedImages.map((img, index) => (
            <div 
              className="A-imgs" 
              key={index}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img.imageUrl} 
                loading="lazy" 
                alt={img.title || `Animated ${index + 1}`} 
              />
              <div className="A-img-overlay">
                <h3>{img.title}</h3>
              </div>
            </div>
          ))}

          <div className="more-animated" onClick={handleMoreClick}>
            MORE<br />ANIMATED
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img src={selectedImage.imageUrl} alt={selectedImage.title} />
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.tags ? selectedImage.tags.join(", ") : ""}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AnimatedBlock;
